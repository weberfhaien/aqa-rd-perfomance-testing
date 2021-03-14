package pages;

import navigationtiming.PerformanceNavigationTiming;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;

import java.util.List;

public class SubcategoryPage extends BasePage {

    @FindBy(xpath = "//div[@class='item-grid']/div")
    private List<WebElement> itemList;

    public List<WebElement> getItemList() {
        return itemList;
    }

    public void clickItemByIndex(int index) {
        itemList.get(index).click();
        PerformanceNavigationTiming.writeToFile(this.getClass().getSimpleName());
    }
}
