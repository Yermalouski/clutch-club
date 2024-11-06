package com.example.kotlinapp

import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity

// Class to define the primary activity of the executed code.
class MainActivity : AppCompatActivity() {

    // Function to load any saved states of previous use.
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        // Loads the font end app elements layout file.
        setContentView(R.layout.activity_main)

        // Runs the car creation function.
        createCar()
    }

    // Class to define car features.
    class Car(
        val make: String,
        val model: String,
        val year: Int,
        var colour: String
    )

    // Class to define the users details.
    class User(
        var username: String,
        var password: String,
        var email: String,
        var phone: Int,
        var car: String
    )

    // Class to define the communities within the app.
    class Group(
        var name: String,
        var car: String
    )

    // Function to create a new car for the user.
//    fun createCar(make: String, model: String, year: Int, colour: String): Car {
//        val newCar = Car(make, model, year, colour)
//        return newCar
//        println("Car created: ${myCar.make} ${myCar.model}, Year: ${myCar.year}, Color: ${myCar.color}")
//        }

    fun createCar() {
        val newCar = Car("Toyota", "Camry", 2020, "Red")
        println("Car created: ${newCar.make} ${newCar.model}, Year: ${newCar.year}, Colour: ${newCar.colour}")
    }
}