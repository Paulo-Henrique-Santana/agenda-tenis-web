
You are an expert in TypeScript, Angular, and scalable web application development. You write functional, maintainable, performant, and accessible code following Angular and TypeScript best practices.

## Language Conventions

- All code identifiers MUST be in English: variable names, function names, class names, interface names, type names, enum values, file names, folder names, route paths, CSS class names, and Angular selector names.
- All Git artifacts MUST be in English: commit messages, branch names, and tag names.
- All code comments and documentation (JSDoc, inline comments) MUST be in English.
- All user-facing text MUST be in Brazilian Portuguese (pt-BR): page titles, section headings, input labels, button labels, placeholder text, validation messages, toast notifications, confirmation dialogs, and any other text rendered in the UI.

## TypeScript Best Practices

- Use strict type checking
- Prefer type inference when the type is obvious
- Avoid the `any` type; use `unknown` when type is uncertain

## Angular Best Practices

- Always use standalone components over NgModules
- Must NOT set `standalone: true` inside Angular decorators. It's the default in Angular v20+.
- Use signals for state management
- Implement lazy loading for feature routes
- Do NOT use the `@HostBinding` and `@HostListener` decorators. Put host bindings inside the `host` object of the `@Component` or `@Directive` decorator instead
- Use `NgOptimizedImage` for all static images.
  - `NgOptimizedImage` does not work for inline base64 images.

## Accessibility Requirements

- It MUST pass all AXE checks.
- It MUST follow all WCAG AA minimums, including focus management, color contrast, and ARIA attributes.

### Components

- Keep components small and focused on a single responsibility
- Page-level components MUST use the `.page` suffix: file names as `<feature>.page.ts` and class names as `<Feature>Page` (e.g., `reserva.page.ts` → `ReservaPage`)
- Sub-components within a feature folder use the `.component` suffix as usual
- Use `input()` and `output()` functions instead of decorators
- Use `computed()` for derived state
- Set `changeDetection: ChangeDetectionStrategy.OnPush` in `@Component` decorator
- Prefer inline templates for small components
- Prefer Reactive forms instead of Template-driven ones
- Do NOT use `ngClass`, use `class` bindings instead
- Do NOT use `ngStyle`, use `style` bindings instead
- When using external templates/styles, use paths relative to the component TS file.

## State Management

- Use signals for local component state
- Use `computed()` for derived state
- Keep state transformations pure and predictable
- Do NOT use `mutate` on signals, use `update` or `set` instead

## Templates

- Keep templates simple and avoid complex logic
- Use native control flow (`@if`, `@for`, `@switch`) instead of `*ngIf`, `*ngFor`, `*ngSwitch`
- Use the async pipe to handle observables
- Do not assume globals like (`new Date()`) are available.
- Do not write arrow functions in templates (they are not supported).

## Services

- Design services around a single responsibility
- Use the `providedIn: 'root'` option for singleton services
- Use the `inject()` function instead of constructor injection

## Project Structure

Organize the source code under `src/app/` following a feature-based layout:

```
src/
  app/
    app.config.ts          # Root application configuration
    app.html               # Root component template
    app.routes.ts          # Top-level route definitions
    app.scss               # Root component styles
    app.ts                 # Root component
    core/                  # Singleton services, guards, interceptors, and app-wide utilities
      guards/
      interceptors/
      services/
    shared/                # Reusable components, directives, and pipes used across features
      components/
      directives/
      pipes/
    <feature>/             # One folder per feature/domain (e.g., reserva/, quadra/, usuario/)
      components/          # Feature-specific sub-components
      services/            # Feature-scoped services (if not global)
      models/              # Interfaces and types scoped to this feature
      <feature>.page.ts       # Page-level component (routed entry point)
      <feature>.page.html
      <feature>.page.scss
      <feature>.page.spec.ts
      <feature>.routes.ts     # Lazy-loaded child routes for the feature
```

### Structure Rules

- Every feature that has its own routes MUST define a `<feature>.routes.ts` file and be lazy-loaded from `app.routes.ts`.
- Place globally shared interfaces and types in `src/app/shared/models/` or co-locate them with the feature that owns them.
- Place app-wide singleton services (e.g., `AuthService`, `ThemeService`) under `core/services/`.
- Do NOT create a `modules/` folder — the project uses standalone components exclusively.
- Keep component files (`.ts`, `.html`, `.scss`, `.spec.ts`) together in the same folder.

## PrimeNG

- Use PrimeNG as the primary UI component library
- Configure PrimeNG in `app.config.ts` via `providePrimeNG()` with a theme (e.g., Aura, Lara, Nora)
- Import PrimeNG components individually (standalone) — never use `PrimeNGModule`
- Use PrimeNG CSS variables and the theme system for customization; avoid hardcoding colors
- Prefer PrimeNG built-in directives (e.g., `pButton`, `pInputText`) over custom equivalents
- Use `pRipple` for ripple effects only when the PrimeNG theme supports it
- Always set `fluid` or width utilities instead of inline styles for layout sizing
- Use `<p-toast>` + `MessageService` for user notifications; provide `MessageService` at component or root level as needed
- Use `<p-confirmDialog>` + `ConfirmationService` for destructive action confirmations
- Prefer PrimeNG form components (`p-select`, `p-datepicker`, `p-inputnumber`, etc.) with Reactive Forms
- Use `[(ngModel)]` only when absolutely necessary; prefer `formControl` / `formControlName`
- Always provide `ariaLabel` or `ariaLabelledBy` on PrimeNG interactive components for accessibility
