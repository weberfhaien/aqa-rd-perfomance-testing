package tests;

import driver.SupportedDrivers;
import driver.WebDriverConfiguration;
import org.openqa.selenium.WebDriver;
import org.testng.annotations.AfterClass;
import org.testng.annotations.BeforeClass;
import steps.PerformanceStep;

public class BaseTest {

    private WebDriver driver;

    @BeforeClass
    public void initDriver() {
        driver = WebDriverConfiguration.setWebDriver(SupportedDrivers.FIREFOX);
        driver.manage().window().maximize();
    }

    @AfterClass
    public void tearDown() {
        WebDriverConfiguration.clearCookies();
        WebDriverConfiguration.tearDown();
    }

    public PerformanceStep getPerformanceStep() {
        return new PerformanceStep();
    }
}
