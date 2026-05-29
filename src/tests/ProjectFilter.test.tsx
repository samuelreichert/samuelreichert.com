import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import ProjectFilter, { type ProjectFilterItem } from '../components/ProjectFilter';

const projects: ProjectFilterItem[] = [
  {
    id: 'one',
    name: 'TypeScript Project',
    description: 'Uses TypeScript first.',
    repo: 'https://github.com/example/one',
    tags: ['TypeScript', 'React'],
    lang: 'TypeScript',
    delay: 60,
  },
  {
    id: 'two',
    name: 'JavaScript Project',
    description: 'Uses JavaScript first.',
    repo: 'https://github.com/example/two',
    tags: ['JavaScript', 'React'],
    lang: 'JavaScript',
    delay: 120,
  },
  {
    id: 'three',
    name: 'Astro Project',
    description: 'Uses Astro without React.',
    repo: 'https://github.com/example/three',
    tags: ['Astro'],
    lang: 'Astro',
    delay: 180,
  },
];

describe('ProjectFilter', () => {
  it('filters projects by any matching tag', () => {
    render(
      <ProjectFilter
        tags={['TypeScript', 'JavaScript', 'React', 'Astro']}
        projects={projects}
      />,
    );

    fireEvent.click(screen.getByRole('button', { name: 'React' }));

    expect(screen.getByText('TypeScript Project')).toBeVisible();
    expect(screen.getByText('JavaScript Project')).toBeVisible();
    expect(screen.getByText('Astro Project')).not.toBeVisible();
  });

  it('restores all projects when All is selected', () => {
    render(
      <ProjectFilter
        tags={['TypeScript', 'JavaScript', 'React', 'Astro']}
        projects={projects}
      />,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Astro' }));
    expect(screen.getByText('TypeScript Project')).not.toBeVisible();

    fireEvent.click(screen.getByRole('button', { name: 'All' }));

    expect(screen.getByText('TypeScript Project')).toBeVisible();
    expect(screen.getByText('JavaScript Project')).toBeVisible();
    expect(screen.getByText('Astro Project')).toBeVisible();
  });
});
