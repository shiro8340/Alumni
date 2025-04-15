<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

include 'db.php';

$data = json_decode(file_get_contents("php://input"));

if (isset($data->Full_Name) && isset($data->Email) && isset($data->Mobile_Number) && isset($data->Password)) {
    $Full_Name = $conn->real_escape_string($data->Full_Name);
    $Email = $conn->real_escape_string($data->Email);
    $Mobile_Number=$conn->real_escape_string($data->Mobile_Number);
    $password = password_hash($data->password, PASSWORD_BCRYPT); // Encrypt password

    $sql = "INSERT INTO users (Full_Name, Email,Mobile_Number, Password) VALUES ('$Full_Name', '$Email','$Mobile_Number', '$password')";

    if ($conn->query($sql) === TRUE) {
        echo json_encode(["message" => "User saved successfully!"]);
    } else {
        echo json_encode(["error" => "Error: " . $conn->error]);
    }
} else {
    echo json_encode(["error" => "Invalid input"]);
}

$conn->close();
?>
