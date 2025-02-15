import requests

# Make port visibility public
# Replace below URLs with GitHub Codespace forwarded URLs
DEALER_NODE_API_URL = "https://friendly-giggle-r44gjqwqjjxwfxj7-3030.app.github.dev"  # noqa: E501
CARS_NODE_API_URL = "https://friendly-giggle-r44gjqwqjjxwfxj7-3050.app.github.dev"  # noqa: E501


def test_dealer_mongodb_api():
    response = requests.get(f"{DEALER_NODE_API_URL}/fetchDealers/Kansas")
    assert response.status_code == 200, (
        f"Unexpected status code: {response.status_code}"
    )

    json_data = response.json()

    assert isinstance(json_data, list), "Response is not a list"

    # Ensure every dictionary in response has 'state' key with value 'Kansas'
    assert all(
        dealer.get("state") == "Kansas"
        for dealer in json_data
        if isinstance(dealer, dict)
        ), "Not all dealers are in Kansas"


def test_carsinventory_mongodb_api():
    response = requests.get(f"{CARS_NODE_API_URL}/cars/1")
    assert response.status_code == 200, (
        f"Unexpected status code: {response.status_code}"
    )

    json_data = response.json()

    assert isinstance(json_data, list), "Response is not a list"

    # Ensure each car dictionary has dealer_id = 1
    assert all(
        car.get("dealer_id") == 1
        for car in json_data
        if isinstance(car, dict)
    ), "Not all cars belong to the correct dealer"


def test_alldealers_mongodb_api():
    response = requests.get(f"{DEALER_NODE_API_URL}/fetchDealers")
    assert response.status_code == 200, (
        f"Unexpected status code: {response.status_code}"
    )

    json_data = response.json()

    assert isinstance(json_data, list), "Response is not a list"
    assert len(json_data) > 0, "Dealer list is empty"


def test_reviews_mongodb_api():
    response = requests.get(f"{DEALER_NODE_API_URL}/fetchReviews")
    assert response.status_code == 200, (
        f"Unexpected status code: {response.status_code}"
    )

    json_data = response.json()

    assert isinstance(json_data, list), "Response is not a list"
    assert len(json_data) > 0, "Review list is empty"
