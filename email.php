<?php
require 'vendor/autoload.php';

session_start();

// Create the client
$client = new Google\Client();
$client->setApplicationName('Gmail API PHP Quickstart');
$client->setScopes(Google\Service\Gmail::GMAIL_READONLY);
$client->setAuthConfig('credentials.json'); // Path to your credentials.json file
$client->setAccessType('offline');
$client->setPrompt('select_account consent');
$client->setRedirectUri('http://localhost/ZLK/email.php');

// Handle authorization
if (isset($_GET['code'])) {
    $token = $client->fetchAccessTokenWithAuthCode($_GET['code']);
    $_SESSION['access_token'] = $token;
    
    header('Location: ' . filter_var('http://localhost/ZLK/email.php', FILTER_SANITIZE_URL));
    exit();
}

// Check if we have an access token
if (isset($_SESSION['access_token']) && $_SESSION['access_token']) {
    $client->setAccessToken($_SESSION['access_token']);
} else {
    $authUrl = $client->createAuthUrl();
    echo "<h2>Authorize Access</h2>";
    echo "<p>Please click the link below to authorize this application:</p>";
    echo "<a href='" . htmlspecialchars($authUrl) . "'>Authorize</a>";
    exit();
}

// Create the Gmail service
$service = new Google\Service\Gmail($client);
$user = 'me';
$messages = [];
$pageToken = null;
$messagesPerPage = 100; // Number of messages to display per page
$currentPage = isset($_GET['page']) ? (int)$_GET['page'] : 1;

// Loop to get all messages
do {
    $optParams = [];
    if ($pageToken) {
        $optParams['pageToken'] = $pageToken;
    }
    $optParams['maxResults'] = $messagesPerPage;

    $results = $service->users_messages->listUsersMessages($user, $optParams);
    $messages = array_merge($messages, $results->getMessages());
    $pageToken = $results->getNextPageToken();
} while ($pageToken);

// Calculate total messages and total pages
$totalMessages = count($messages);
$totalPages = ceil($totalMessages / $messagesPerPage);
$startIndex = ($currentPage - 1) * $messagesPerPage;
$endIndex = min($startIndex + $messagesPerPage, $totalMessages);

// Clear output
echo "<h2>Inbox Messages:</h2>";

if ($totalMessages == 0) {
    echo "<p>No messages found.</p>";
} else {
    echo "<ul>";
    for ($i = $startIndex; $i < $endIndex; $i++) {
        $message = $messages[$i];
        $msg = $service->users_messages->get($user, $message->getId());
        $headers = $msg->getPayload()->getHeaders();
        
        // Initialize variables for subject and sender
        $subject = '';
        $from = '';
        
        // Loop through headers to find subject and from
        foreach ($headers as $header) {
            if ($header->getName() === 'Subject') {
                $subject = $header->getValue();
            }
            if ($header->getName() === 'From') {
                $from = $header->getValue();
            }
        }

        echo "<li><strong>From:</strong> " . htmlspecialchars($from) . "<br>";
        echo "<strong>Subject:</strong> " . htmlspecialchars($subject) . "<br>";
        echo "<strong>Message ID:</strong> " . htmlspecialchars($msg->getId()) . "<br>";
        echo "<strong>Snippet:</strong> " . htmlspecialchars($msg->getSnippet()) . "</li>";
    }
    echo "</ul>";
}

// Display pagination controls
echo "<div class='pagination'>";
if ($currentPage > 1) {
    echo "<a href='?page=" . ($currentPage - 1) . "'>Previous</a> ";
}
if ($currentPage < $totalPages) {
    echo "<a href='?page=" . ($currentPage + 1) . "'>Next</a>";
}
echo "</div>";
?>
