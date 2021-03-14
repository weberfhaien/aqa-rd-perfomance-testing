package tests;

import org.testng.annotations.Test;

public class PerformanceTest extends BaseTest {

    @Test(priority = 1)
    public void openHomePage() {
        getPerformanceStep().openHomePage();
    }

    @Test(priority = 2)
    public void openCategoryPage() {
        getPerformanceStep().openComputersPage();
    }

    @Test(priority = 3)
    public void openSubcategoryPage() {
        getPerformanceStep().openDesktopsPage();
    }

    @Test(priority = 4)
    public void openItemPage() {
        getPerformanceStep().openItemPage();
    }
}
