<?php
// Set CORS headers so the React frontend can call this endpoint
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json; charset=UTF-8");

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["success" => false, "error" => "Method not allowed"]);
    exit();
}

// 1. Determine the API key
$apiKey = 'KPWV4FQ-PWSMVTJ-Q4NKQJK-448R7SZ'; // Pre-configured default fallback

// Try loading from .env file if it exists
$envPath = $_SERVER['DOCUMENT_ROOT'] . '/.env';
if (file_exists($envPath)) {
    $lines = file($envPath, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    foreach ($lines as $line) {
        if (strpos(trim($line), '#') === 0) continue;
        if (strpos($line, '=') === false) continue;
        list($name, $value) = explode('=', $line, 2);
        $name = trim($name);
        $value = trim($value);
        if ($name === 'NOWPAYMENTS_API_KEY') {
            $apiKey = trim($value, '"\'');
            break;
        }
    }
}

// Or check getenv
$envKey = getenv('NOWPAYMENTS_API_KEY');
if (!empty($envKey)) {
    $apiKey = $envKey;
}

// Read and decode POST JSON payload
$input = file_get_contents('php://input');
$body = json_decode($input, true);

if (!$body) {
    http_response_code(400);
    echo json_encode(["success" => false, "error" => "Invalid JSON payload"]);
    exit();
}

$price_amount = isset($body['price_amount']) ? (float)$body['price_amount'] : 0;
$price_currency = isset($body['price_currency']) ? $body['price_currency'] : 'GBP';
$order_description = isset($body['order_description']) ? $body['order_description'] : 'IPTV Subscription';
$customer_email = isset($body['customer_email']) ? $body['customer_email'] : '';

// Handle Sandbox / Empty key Fallback
if (empty($apiKey) || $apiKey === 'MY_NOWPAYMENTS_API_KEY') {
    $mockInvoiceId = 'test_' . substr(md5(uniqid(rand(), true)), 0, 8);
    echo json_encode([
        "success" => true,
        "is_sandbox" => true,
        "id" => $mockInvoiceId,
        "invoice_url" => "https://nowpayments.io/payment?iid=" . $mockInvoiceId
    ]);
    exit();
}

// Build standard request to NOWPayments API
$url = "https://api.nowpayments.io/v1/invoice";
$scheme = isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http";
$host = isset($_SERVER['HTTP_HOST']) ? $_SERVER['HTTP_HOST'] : 'globalstreamhub.net';

$payload = [
    "price_amount" => $price_amount,
    "price_currency" => $price_currency,
    "order_description" => $order_description,
    "customer_email" => $customer_email,
    "success_url" => $scheme . "://" . $host . "?payment=success",
    "cancel_url" => $scheme . "://" . $host . "?payment=cancel"
];

$ch = curl_init($url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($payload));
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    "x-api-key: " . $apiKey,
    "Content-Type: application/json"
]);

// Execute cURL request
$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$curlError = curl_error($ch);
curl_close($ch);

if ($curlError) {
    http_response_code(500);
    echo json_encode(["success" => false, "error" => "cURL Error: " . $curlError]);
    exit();
}

if ($httpCode >= 400) {
    http_response_code($httpCode);
    $nowPaymentsError = json_decode($response, true);
    if ($nowPaymentsError) {
        echo json_encode(["success" => false, "error" => isset($nowPaymentsError['message']) ? $nowPaymentsError['message'] : $response]);
    } else {
        echo json_encode(["success" => false, "error" => $response]);
    }
    exit();
}

$data = json_decode($response, true);
if (isset($data['id'])) {
    echo json_encode([
        "success" => true,
        "is_sandbox" => false,
        "id" => $data['id'],
        "invoice_url" => $data['invoice_url']
    ]);
} else {
    http_response_code(500);
    echo json_encode(["success" => false, "error" => "Invalid response from payment gateway", "raw" => $response]);
}
?>
