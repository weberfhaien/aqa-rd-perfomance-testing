package steps;

import pages.CategoryPage;
import pages.HomePage;
import pages.SubcategoryPage;

public class BaseStep {

    public HomePage getHomePage() {
        return new HomePage();
    }

    public CategoryPage getCategoryPage() {
        return new CategoryPage();
    }

    public SubcategoryPage getSubcategoryPage() {
        return new SubcategoryPage();
    }
}
