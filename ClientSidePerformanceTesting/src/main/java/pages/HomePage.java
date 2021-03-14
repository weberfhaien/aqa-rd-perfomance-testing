package pages;

import navigationtiming.PerformanceNavigationTiming;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;

import java.util.List;

public class HomePage extends BasePage {

    @FindBy(xpath = "//ul[@class='top-menu notmobile']/li")
    private List<WebElement> categoryList;

    public HomePage open(String url) {
        getWebDriver().get(url);
        return this;
    }

    public List<WebElement> getCategoryList() {
        return categoryList;
    }

    public void clickCategoryByIndex(int index) {
        categoryList.get(index).click();
        PerformanceNavigationTiming.writeToFile(this.getClass().getSimpleName());
    }
}
