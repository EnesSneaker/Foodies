package com.foodies.backend.recipeLogic;

public enum UnitEnum {
    NONE(""),
    ML("ml"),
    G("g"),
    TBSP("tbsp"),
    TSP("tsp");

    private String UnitOfMeasurement;

    UnitEnum(String unitOfMeasurement) {
        UnitOfMeasurement = unitOfMeasurement;
    }

    public String getUnitOfMeasurement() {
        return UnitOfMeasurement;
    }
}
