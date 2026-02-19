public class PerformanceTracker {

    public static long start() {
        return System.nanoTime();
    }

    public static void stop(long startTime, String operation) {
        long endTime = System.nanoTime();
        long duration = endTime - startTime;
        System.out.println("Operation '" + operation + "' took " + duration + " ns");
    }
}
