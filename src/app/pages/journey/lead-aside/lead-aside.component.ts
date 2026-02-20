import { Component } from '@angular/core';
import { TablerIconsModule } from 'angular-tabler-icons';

@Component({
  selector: 'app-lead-aside',
  templateUrl: './lead-aside.component.html',
  styleUrl: './lead-aside.component.scss',
  imports: [TablerIconsModule],
})
export class LeadAsideComponent {
  collapsed = false;

  profiles = [
    {
      name: 'Matheus da Silva Salomão',
      cpf: '123.456.789-00',
      contacts: [
        { type: 'phone', value: '(11) 98765-4321' },
        { type: 'email', value: 'maria.silva@email.com' },
      ],
    },
    {
      name: 'João Souza',
      cpf: '987.654.321-00',
      contacts: [
        { type: 'phone', value: '(21) 99876-5432' },
        { type: 'email', value: 'joao.souza@email.com' },
      ],
    },
    {
      name: 'Ana Lima',
      cpf: '111.222.333-44',
      contacts: [
        { type: 'phone', value: '(31) 91234-5678' },
        { type: 'email', value: 'ana.lima@email.com' },
      ],
    },
  ];

  toggleCollapsed(): void {
    this.collapsed = !this.collapsed;
  }

  getInitials(name: string): string {
    const parts = name.trim().split(/\s+/);
    if (!parts.length) return '';
    const first = parts[0][0] ?? '';
    const last = parts.length > 1 ? (parts[parts.length - 1][0] ?? '') : '';
    return (first + last).toUpperCase();
  }

  getLiClasses() {
    const baseClasses = [
      'group',
      'relative',
      'flex',
      'cursor-pointer',
      'items-center',
      'gap-3',
      'rounded-lg',
      'px-2',
      'py-2.5',
      'transition-all',
      'duration-150',
      'active:scale-[0.98]',
    ];

    if (this.collapsed) {
      baseClasses.push('justify-center');
    } else {
      baseClasses.push('', 'bg-transparent', 'border-border/40', 'bg-card', 'hover:border-primary/30', 'border');
    }

    return baseClasses.join(' ');
  }
}
