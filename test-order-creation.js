// Manual test script for order creation API
// Run this with: node test-order-creation.js

const baseUrl = "http://localhost:3000/api/orders/create";

// Test data
const validOrderData = {
  invId: "123456789",
  amount: 30300,
  citizenship: "112",
  vizaType: "Туристическая виза",
  peoples: "1",
  firstStepPrice: "6300₽",
  vizaTypeTwo: "30 дней - Однократная",
  phone: "1234567890",
  email: "test@example.com",
  preferredContact: "whatsapp",
  data: [
    {
      lastName: "Test",
      firstName: "User",
      middleName: "Middle",
      birthDate: "1990-01-01T00:00:00.000Z",
      gender: "male",
      tourType: "Economy",
      visaType: "Туристическая виза",
      visaTypeTwo: "30 дней - Однократная",
      passportNumber: "A1234567",
      passportExpiryDate: "2030-01-01T00:00:00.000Z",
      entryDate: "2025-06-01T00:00:00.000Z",
      exitDate: "2025-06-30T00:00:00.000Z",
      citizenship: "112",
      tripPurpose: "Tourism",
      itinerary: "Hotel ABC",
      additionalInfo: "",
      visaTime: "30 дней - Однократная",
      price: 30300,
    },
  ],
};

async function testOrderCreation(testName, orderData, shouldSucceed = true) {
  console.log(`\n📝 Testing: ${testName}`);
  console.log("Request data:", JSON.stringify(orderData, null, 2));

  try {
    const response = await fetch(baseUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderData),
    });

    const data = await response.json();

    if (shouldSucceed && response.ok) {
      console.log("✅ Test passed: Order created successfully");
      console.log("Response:", data);
    } else if (!shouldSucceed && !response.ok) {
      console.log("✅ Test passed: Order rejected as expected");
      console.log("Error message:", data.error);
    } else {
      console.log("❌ Test failed");
      console.log("Expected success:", shouldSucceed);
      console.log("Actual success:", response.ok);
      console.log("Response:", data);
    }
  } catch (error) {
    console.log("❌ Test failed with exception:", error.message);
  }
}

async function runTests() {
  console.log("🧪 Starting Order Creation API Tests\n");

  // Test 1: Valid order
  await testOrderCreation(
    "Valid order with all correct dates",
    {
      ...validOrderData,
      invId: `test_${Date.now()}_1`,
    },
    true
  );

  // Test 2: Empty birthDate
  await testOrderCreation(
    "Order with empty birthDate",
    {
      ...validOrderData,
      invId: `test_${Date.now()}_2`,
      data: [
        {
          ...validOrderData.data[0],
          birthDate: "",
        },
      ],
    },
    false
  );

  // Test 3: Invalid date format
  await testOrderCreation(
    "Order with invalid date format",
    {
      ...validOrderData,
      invId: `test_${Date.now()}_3`,
      data: [
        {
          ...validOrderData.data[0],
          birthDate: "not-a-date",
        },
      ],
    },
    false
  );

  // Test 4: Null passportExpiryDate
  await testOrderCreation(
    "Order with null passportExpiryDate",
    {
      ...validOrderData,
      invId: `test_${Date.now()}_4`,
      data: [
        {
          ...validOrderData.data[0],
          passportExpiryDate: null,
        },
      ],
    },
    false
  );

  // Test 5: Missing entryDate
  await testOrderCreation(
    "Order with missing entryDate",
    {
      ...validOrderData,
      invId: `test_${Date.now()}_5`,
      data: [
        {
          ...validOrderData.data[0],
          entryDate: undefined,
        },
      ],
    },
    false
  );

  // Test 6: Multiple applicants with one invalid
  await testOrderCreation(
    "Multiple applicants with one invalid",
    {
      ...validOrderData,
      invId: `test_${Date.now()}_6`,
      peoples: "2",
      data: [
        validOrderData.data[0],
        {
          ...validOrderData.data[0],
          lastName: "Invalid",
          firstName: "User",
          birthDate: "", // Invalid
        },
      ],
    },
    false
  );

  // Test 7: Edge case - birthDate as "Invalid Date" string
  await testOrderCreation(
    'Order with "Invalid Date" string',
    {
      ...validOrderData,
      invId: `test_${Date.now()}_7`,
      data: [
        {
          ...validOrderData.data[0],
          birthDate: "Invalid Date",
        },
      ],
    },
    false
  );

  console.log("\n✨ All tests completed!\n");
}

// Check if the server is running
fetch("http://localhost:3000")
  .then(() => {
    console.log("Server is running on localhost:3000");
    runTests();
  })
  .catch(() => {
    console.error("❌ Server is not running on localhost:3000");
    console.error("Please start the server with: npm run dev");
  });
