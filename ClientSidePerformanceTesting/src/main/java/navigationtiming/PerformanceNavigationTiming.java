package navigationtiming;

import driver.WebDriverConfiguration;
import org.json.JSONArray;
import org.json.JSONObject;
import org.openqa.selenium.JavascriptExecutor;

import java.io.FileWriter;
import java.io.IOException;
import java.util.Map;

public class PerformanceNavigationTiming {

    private static Map<String, Object> timings = null;

    private static JSONObject jsonObject;

    private static final String JavaScriptForPerformance = "var performance = window.performance || window.webkitPerformance ||" +
            "window.mozPerformance || window.msPerformance || {}; var timings = performance.timing || {}; return timings;";

    private static final String fileName = "src/main/resources/performance.json";

    public static Map<String, Object> getAllTiming() {
        JavascriptExecutor jsrunner = (JavascriptExecutor) WebDriverConfiguration.getWebDriver();
        timings = (Map<String, Object>) jsrunner.executeScript(JavaScriptForPerformance);
        return timings;
    }

    public static void writeToFile(String pageTitle) {
        getAllTiming();
        if (jsonObject == null) {
            jsonObject = new JSONObject();
        }
        try (FileWriter writer = new FileWriter(fileName)) {
            JSONArray jsonArray = new JSONArray();
            jsonArray.put(getJsonPart());
            jsonObject.put(pageTitle, jsonArray);
            writer.write(jsonObject.toString());
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    private static JSONObject getJsonPart() {
        JSONObject json = new JSONObject();
        json.put("Latency", getLatency());
        json.put("BackendResponse", getBackendResponse());
        json.put("TimeToInteract", getTimeToInteract());
        json.put("TimeToLoad", getTimeToLoad());
        json.put("OnLoad", getOnLoad());
        json.put("TotalTime", getTotalTime());
        return json;
    }

    private static Long getDomComplete() {
        return (Long) timings.get("domComplete");
    }

    private static Long getDomInteractive() {
        return (Long) timings.get("domInteractive");
    }

    private static Long getDomLoading() {
        return (Long) timings.get("domLoading");
    }

    private static Long getLoadEventEnd() {
        return (Long) timings.get("loadEventEnd");
    }

    private static Long getLoadEventStart() {
        return (Long) timings.get("loadEventStart");
    }

    private static Long getNavigationStart() {
        return (Long) timings.get("navigationStart");
    }

    private static Long getResponseEnd() {
        return (Long) timings.get("responseEnd");
    }

    private static Long getResponseStart() {
        return (Long) timings.get("responseStart");
    }

    private static Long getLatency() {
        return getResponseStart() - getNavigationStart();
    }

    private static Long getBackendResponse() {
        return getResponseEnd() - getResponseStart();
    }

    private static Long getTimeToInteract() {
        return getDomInteractive() - getDomLoading();
    }

    private static Long getTimeToLoad() {
        return getDomComplete() - getDomInteractive();
    }

    private static Long getOnLoad() {
        return getLoadEventEnd() - getLoadEventStart();
    }

    private static Long getTotalTime() {
        return getLoadEventEnd() - getNavigationStart();
    }
}
