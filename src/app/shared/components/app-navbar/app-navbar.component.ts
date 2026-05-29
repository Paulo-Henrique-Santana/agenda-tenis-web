import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <nav class="app-navbar" aria-label="Navegação principal">
      <div class="app-navbar__brand">
        <span class="app-navbar__logo" aria-hidden="true">🎾</span>
        <span class="app-navbar__title">Agenda Tênis</span>
      </div>
      <ul class="app-navbar__links" role="list">
        <li>
          <a
            routerLink="/reserva"
            routerLinkActive="app-navbar__link--active"
            [ariaCurrentWhenActive]="'page'"
            class="app-navbar__link"
          >Nova Reserva</a>
        </li>
        <li>
          <a
            routerLink="/email-logs"
            routerLinkActive="app-navbar__link--active"
            [ariaCurrentWhenActive]="'page'"
            class="app-navbar__link"
          >E-mails Enviados</a>
        </li>
      </ul>
    </nav>
  `,
  styles: [`
    .app-navbar {
      display: flex;
      align-items: center;
      gap: 2rem;
      padding: 0 2rem;
      height: 56px;
      background: var(--p-surface-900);
      border-bottom: 2px solid var(--tennis-accent-dim);
      box-shadow: 0 2px 12px rgba(0, 0, 0, 0.4);
    }

    .app-navbar__brand {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      flex-shrink: 0;
    }

    .app-navbar__logo {
      font-size: 1.25rem;
      line-height: 1;
    }

    .app-navbar__title {
      font-size: 1rem;
      font-weight: 700;
      color: var(--tennis-accent);
      letter-spacing: 0.02em;
    }

    .app-navbar__links {
      display: flex;
      align-items: center;
      gap: 0.25rem;
      list-style: none;
      margin: 0;
      padding: 0;
    }

    .app-navbar__link {
      display: inline-block;
      padding: 0.4rem 1rem;
      border-radius: 6px;
      font-size: 0.9375rem;
      font-weight: 500;
      color: var(--p-surface-100);
      text-decoration: none;
      transition: background 0.15s, color 0.15s;
      border: 1px solid transparent;

      &:hover {
        background: var(--p-surface-700);
        color: #fff;
      }

      &:focus-visible {
        outline: 2px solid var(--tennis-accent);
        outline-offset: 2px;
      }

      &.app-navbar__link--active {
        background: var(--p-primary-800);
        color: var(--tennis-accent);
        border-color: var(--tennis-accent-dim);
        font-weight: 600;
      }
    }
  `],
})
export class AppNavbarComponent {}
