string[] fraudulentOrderIDs = { "B123", "C234", "A345", "C15", "B177", "G3003", "C235", "B179" };

foreach (string Id in fraudulentOrderIDs){
    if (Id.StartsWith("B")){
        Console.WriteLine("This may be fradulent " + Id);
    }
}
