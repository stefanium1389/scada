namespace scada_back
{
    public static class SimulationDriver
    {
        public static double Sine()
        {
            return 100 * Math.Sin((double)DateTime.Now.Second / 60 * Math.PI);
        }

        public static double Cosine()
        {
            return 100 * Math.Cos((double)DateTime.Now.Second / 60 * Math.PI);
        }

        public static double Ramp()
        {
            return 100 * DateTime.Now.Second / 60;
        }
    }
}
