using System;

namespace test {
    public class Program {
        static void Main(string[] args) {
            // Given Unix timestamp
            int unixTimestamp = 1709154000;

            // Convert to DateTime
            DateTime dateTime = new DateTime(1970, 1, 1).AddSeconds(unixTimestamp);

            // Format the time in 12-hour format with AM/PM
            string formattedTime = dateTime.ToString("hh:mm tt");

            // Print the formatted time
            Console.WriteLine($"Formatted Time: {formattedTime}");

        }
    }
}