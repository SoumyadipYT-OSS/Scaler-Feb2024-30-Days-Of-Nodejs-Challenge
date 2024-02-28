using System;

namespace MyDateFormatNuGetPackage
{
    public static class UnixTimestampConverter {
        public static string ConvertUnixTimestampToFormattedTime(int unixTimestamp) {
            // Convert Unix timestamp to DateTimeOffset
            DateTimeOffset dateTimeOffset = DateTimeOffset.FromUnixTimeSeconds(unixTimestamp);

            // Format the time in 12-hour format with AM/PM
            string formattedTime = dateTimeOffset.ToString("hh:mm tt");

            return formattedTime;
        }


        // main method
        static void Main(string[] args) {
            // Test the method
            int unixTimestamp = 1645363200;
            string formattedTime = ConvertUnixTimestampToFormattedTime(unixTimestamp);
            Console.WriteLine(formattedTime);
        }
    }
}
