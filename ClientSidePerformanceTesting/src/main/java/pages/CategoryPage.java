package pages;

import navigationtiming.PerformanceNavigationTiming;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;

import java.util.List;

public class CategoryPage extends BasePage {

    @FindBy(xpath = "//div[@class='item-grid']/div")
    private List<WebElement> subcategoryList;

    public List<WebElement> getSubcategoryList() {
        return subcategoryList;
    }

    public void clickSubcategoryByIndex(int index) {
        subcategoryList.get(index).click();
        PerformanceNavigationTiming.writeToFile(this.getClass().getSimpleName());
    }
}
