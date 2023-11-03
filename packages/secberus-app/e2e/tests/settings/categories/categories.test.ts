import { expect } from '../../../fixtures/baseFixtures';
import categoriesTest, {
  assignCategoryToPolicy,
  createCustomCategoryInAPolicy,
} from './categories.utils';
import { searchForElement, deletePolicy } from '../../policy/policy.utils';

categoriesTest.describe('Categories: Custom Category -', () => {
  categoriesTest.setTimeout(90000);

  categoriesTest(
    'Create Custom Category from Settings Page',
    async ({ categoriesPage }) => {
      //Open New Category Modal
      await categoriesPage.click('text=New Category');

      await categoriesPage.fill(
        'input[name=name]',
        'A Playwright Custom Category'
      );

      await categoriesPage.fill(
        'input[name=description]',
        'A Playwright Custom Category'
      );

      //Assigns type to Category
      await categoriesPage.click('input[name=category_type]');

      //Saves New Category/Closes Modal
      await categoriesPage.click('button:has-text("Save")');

      await categoriesPage.waitForSelector('text=A Playwright Custom Category');
      //Check That Category Exists
      const newCategory = categoriesPage.locator(
        'text=A Playwright Custom Category'
      );
      const isPresent = await newCategory.isVisible();

      expect(isPresent).toBeTruthy();
    }
  );

  categoriesTest('Edit Custom Category', async ({ categoriesPage }) => {
    //Opens Modal to Edit Specific Category
    await categoriesPage.click('data-test-id=editA Playwright Custom Category');

    await categoriesPage.fill(
      'input[name=name]',
      'A Playwright Custom Category Edited'
    );

    //Saves Changes/Closes Modal
    await categoriesPage.click('button:has-text("Save")');

    //Refresh Page
    await categoriesPage.goto('/settings/categories');
    await categoriesPage.waitForSelector(
      'text=A Playwright Custom Category Edited'
    );
    //Check For Changed Text
    const customCategory = categoriesPage.locator(
      'text=A Playwright Custom Category Edited'
    );
    const isPresent = await customCategory.isVisible();

    expect(isPresent).toBeTruthy();
  });

  categoriesTest(
    'Delete Category w/ No Children',
    async ({ categoriesPage }) => {
      //Opens Modal to Delete Specific Category
      await categoriesPage.click(
        'data-test-id=editA Playwright Custom Category Edited',
        { force: true }
      );

      //Remove Category/Closes Modal Then Refresh Page

      await Promise.all([
        categoriesPage.click('button:has-text("Delete")'),
        categoriesPage.waitForResponse(/categories/i),
      ]);
      await categoriesPage.goto('/settings/categories');
      await categoriesPage.waitForSelector('"Access Control: Authentication"');
      //Verify Removal
      const customCategory = categoriesPage.locator(
        'text=A Playwright Custom Category Edited'
      );
      const isPresent = await customCategory.isVisible();
      expect(isPresent).toBeFalsy();
    }
  );
});

categoriesTest.describe('Categories: Custom Category w/ Policies -', () => {
  categoriesTest.setTimeout(90000);

  categoriesTest(
    'Create Custom Category within Add/Edit Policy Page',
    async ({ preCreatePolicyPage }) => {
      //Check Policy Page is Reached
      expect(preCreatePolicyPage.url()).toMatch(/violations/i);

      //Create Policy Within Add/Edit Policy Page
      await preCreatePolicyPage.click('[data-test-id="editPolicyButton"]');
      await createCustomCategoryInAPolicy(preCreatePolicyPage);

      //Check That Category Exists
      await preCreatePolicyPage.waitForSelector(
        'text=A Playwright Custom Policy Category'
      );
      const newCategory = preCreatePolicyPage.locator(
        'text=A Playwright Custom Policy Category'
      );
      const isPresent = await newCategory.isVisible();

      expect(isPresent).toBeTruthy();
    }
  );

  categoriesTest(
    'Assign Custom Category to Existing Policy',
    async ({ preExistingPolicyPage }) => {
      //Check Policy Page is Reached
      expect(preExistingPolicyPage.url()).toMatch(/violations/i);

      await preExistingPolicyPage.click('[data-test-id="editPolicyButton"]');

      await assignCategoryToPolicy(preExistingPolicyPage);
      await preExistingPolicyPage.goBack();
      await preExistingPolicyPage.waitForURL(/violations/i);

      //Verify Reassignment of Policy to New Category
      await preExistingPolicyPage.waitForSelector(
        'text=A Playwright Custom Policy Category'
      );
      const newCategory = preExistingPolicyPage.locator(
        'text=A Playwright Custom Policy Category'
      );

      const isPresent = await newCategory.isVisible();
      expect(isPresent).toBeTruthy();
    }
  );

  categoriesTest(
    'Delete Custom Category after Reassigning Child Policies',
    async ({ categoriesPage }) => {
      await categoriesPage.click(
        'data-test-id=editA Playwright Custom Policy Category',
        { force: true }
      );
      await categoriesPage.click('button:has-text("Delete")');

      //Select New Parent Category
      await categoriesPage.click('text=Select category');
      await categoriesPage.click(
        'li:has-text("Access Control: Authentication")'
      );

      //Ensure Replacement Is Selected Before Deletion
      const selectedCategory = categoriesPage.locator(
        '"Access Control: Authentication"'
      );
      const isSelected = await selectedCategory.nth(1).isVisible();
      expect(isSelected).toBeTruthy();

      await categoriesPage.click('button:has-text("Confirm Deletion")');
      await categoriesPage.waitForResponse(/categories/i);

      //Refresh Page
      await categoriesPage.goto('/settings/categories');
      await categoriesPage.waitForSelector('"Access Control: Authentication"');
      //Verify Removal Of Custom Category
      const removedCategory = categoriesPage.locator(
        'text=A Playwright Custom Policy Category'
      );
      const hasBeenRemoved = await removedCategory.isVisible();
      expect(hasBeenRemoved).toBeFalsy();

      //Verify Reassignment of Policy's Category
      await categoriesPage.click('a:has-text("Policies")');
      await searchForElement(categoriesPage, '"Playwright category policy"');

      //Policy Should Still Appear If It Was Not Orphaned/Successfully Reassigned
      const expectedPolicy = categoriesPage.locator(
        'text=Playwright category policy'
      );
      const policyIsPresent = await expectedPolicy.isVisible();
      expect(policyIsPresent).toBeTruthy();

      //Verify Proper Reassignment Of Category
      const expectedCategory = categoriesPage.locator(
        'text=Access Control: Authentication'
      );
      const categoryIsPresent = await expectedCategory.nth(1).isVisible();
      expect(categoryIsPresent);

      //Clean Up
      await categoriesPage.goto('/policies');

      await categoriesPage.click('"Playwright category policy"');
      await deletePolicy(categoriesPage);
    }
  );
});
