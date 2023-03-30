import pytest
from app.models.Product import ProductSchema, Product
import bson

@pytest.fixture
def product():
    return Product('test_products_table')

def test_product_schema():
    data = {
        "name": "Product 1",
        "calories": 100,
        "fat": 5,
        "protein": 10,
        "carbohydrate": 20,
        "salt": 1,
        "barcode": "123456789"
    }
    schema = ProductSchema(**data)
    assert schema.name == "Product 1"
    assert schema.calories == 100
    assert schema.fat == 5
    assert schema.protein == 10
    assert schema.carbohydrate == 20
    assert schema.salt == 1
    assert schema.barcode == "123456789"

def test_get_product(product):
    data = {
        "name": "Product 1",
        "calories": 100,
        "fat": 5,
        "protein": 10,
        "carbohydrate": 20,
        "salt": 1,
        "barcode": "123456789"
    }
    inserted_id = product.create(data)
    product_data = product.get(bson.ObjectId(inserted_id["_id"]))
    assert product_data is not None
    assert product_data["name"] == "Product 1"
