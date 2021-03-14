package steps;

import org.openqa.selenium.support.ui.ExpectedConditions;

import static utils.Constants.*;

public class PerformanceStep extends BaseStep {

    public void openHomePage() {
        getHomePage().open(BASE_URL);
    }

    public void openComputersPage() {
        getHomePage().clickCategoryByIndex(COMPUTERS_CATEGORY_INDEX);
    }

    public void openDesktopsPage() {
        getCategoryPage().clickSubcategoryByIndex(DESKTOPS_SUBCATEGORY_INDEX);
    }

    public void openItemPage() {
        getSubcategoryPage().explicitWait(DEFAULT_WAITING_TIME,
                ExpectedConditions.visibilityOfAllElements(getSubcategoryPage().getItemList()));
        getSubcategoryPage().clickItemByIndex(FIRST_ITEM_INDEX);
    }

}
