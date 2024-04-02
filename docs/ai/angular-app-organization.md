Sure, here's an example of how you could organize your Angular application with separate modules for each page linked in the navbar, and what the file system might look like:

* `src/app/app.module.ts`: This is the root module of your application. It imports the shared modules and the feature modules for each page.
* `src/app/app.component.ts`: This is the root component of your application. It contains the navbar and the router outlet for displaying the current page.
* `src/app/shared/`: This is a directory for shared modules, components, services, and other code that is used across multiple pages.
* `src/app/home/`: This is a directory for the Home page module. It contains the `home.module.ts` file, which defines the module and its components, services, and routes. It could also contain subdirectories for each component, such as `src/app/home/welcome/` and `src/app/home/features/`.
* `src/app/products/`: This is a directory for the Products page module. It contains the `products.module.ts` file, which defines the module and its components, services, and routes. It could also contain subdirectories for each component, such as `src/app/products/list/` and `src/app/products/details/`.
* `src/app/contact/`: This is a directory for the Contact page module. It contains the `contact.module.ts` file, which defines the module and its components, services, and routes. It could also contain subdirectories for each component, such as `src/app/contact/form/` and `src/app/contact/info/`.

Here's an example file system structure for this application:
```markdown
src/
├── app/
│   ├── app.component.html
│   ├── app.component.ts
│   ├── app.module.ts
│   ├── shared/
│   │   ├── shared.module.ts
│   │   ├── navbar/
│   │   │   ├── navbar.component.html
│   │   │   ├── navbar.component.ts
│   │   │   └── navbar.component.scss
│   │   ├── footer/
│   │   │   ├── footer.component.html
│   │   │   ├── footer.component.ts
│   │   │   └── footer.component.scss
│   ├── home/
│   │   ├── home.module.ts
│   │   ├── home.component.html
│   │   ├── home.component.ts
│   │   ├── home.component.scss
│   │   ├── welcome/
│   │   │   ├── welcome.component.html
│   │   │   ├── welcome.component.ts
│   │   │   └── welcome.component.scss
│   │   └── features/
│   │       ├── features.component.html
│   │       ├── features.component.ts
│   │       └── features.component.scss
│   ├── products/
│   │   ├── products.module.ts
│   │   ├── products.component.html
│   │   ├── products.component.ts
│   │   ├── products.component.scss
│   │   ├── list/
│   │   │   ├── list.component.html
│   │   │   ├── list.component.ts
│   │   │   └── list.component.scss
│   │   └── details/
│   │       ├── details.component.html
│   │       ├── details.component.ts
│   │       └── details.component.scss
│   └── contact/
│       ├── contact.module.ts
│       ├── contact.component.html
│       ├── contact.component.ts
│       ├── contact.component.scss
│       ├── form/
│       │   ├── form.component.html
│       │   ├── form.component.ts
│       │   └── form.component.scss
│       └── info/
│           ├── info.component.html
```
In this example, each page has its own module, and each module has its own directory with its own components, services, and routes. The shared module contains components and services that are used across multiple pages, such as the navbar and footer. This structure makes it easy to organize and maintain your code, and allows you to use lazy loading for each page to improve performance.