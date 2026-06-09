import { useState } from 'react';

export interface ProjectFilterItem {
  id: string;
  name: string;
  description: string;
  repo: string;
  demo?: string;
  tags: string[];
  lang: string;
  delay: number;
}

interface ProjectFilterProps {
  tags: string[];
  projects: ProjectFilterItem[];
}

function ListIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M3 6h18M3 12h18M3 18h18" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.55v-2.13c-3.2.7-3.87-1.34-3.87-1.34-.52-1.32-1.27-1.67-1.27-1.67-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.76 2.69 1.25 3.34.96.1-.74.4-1.25.72-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.18-3.09-.12-.29-.51-1.46.11-3.04 0 0 .96-.31 3.15 1.18.91-.25 1.89-.38 2.86-.38.97 0 1.95.13 2.86.38 2.18-1.49 3.14-1.18 3.14-1.18.62 1.58.23 2.75.11 3.04.74.8 1.18 1.83 1.18 3.09 0 4.42-2.69 5.4-5.26 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.66.8.55 4.56-1.52 7.85-5.83 7.85-10.91C23.5 5.65 18.35.5 12 .5z" />
    </svg>
  );
}

function ExternalLinkIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M7 17 17 7M9 7h8v8" />
    </svg>
  );
}

export default function ProjectFilter({ tags, projects }: ProjectFilterProps) {
  const [activeTag, setActiveTag] = useState('all');

  return (
    <>
      <div
        className="filters reveal is-in"
        role="group"
        aria-label="Filter by language"
      >
        <span className="label">Filter</span>
        <button
          className={`pill${activeTag === 'all' ? ' active' : ''}`}
          type="button"
          aria-pressed={activeTag === 'all'}
          onClick={() => setActiveTag('all')}
        >
          All
        </button>
        {tags.map((tag) => (
          <button
            className={`pill${activeTag === tag ? ' active' : ''}`}
            key={tag}
            type="button"
            aria-pressed={activeTag === tag}
            onClick={() => setActiveTag(tag)}
          >
            {tag}
          </button>
        ))}
      </div>

      <div className="repo-grid" id="repo-grid">
        {projects.map((project) => {
          const isVisible =
            activeTag === 'all' || project.tags.includes(activeTag);

          return (
            <div
              className={`lux-card repo-card reveal is-in reveal-delay-${project.delay}`}
              data-tags={project.tags.join(',')}
              hidden={!isVisible}
              key={project.id}
            >
              <div className="top">
                <span className="name">
                  <ListIcon />
                  {project.name}
                </span>
                <div className="card-links">
                  <a
                    href={project.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="arrow-out"
                    aria-label={`${project.name} GitHub repository`}
                  >
                    <GitHubIcon />
                  </a>
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="arrow-out"
                      aria-label={`${project.name} live demo`}
                    >
                      <ExternalLinkIcon />
                    </a>
                  )}
                </div>
              </div>
              <p className="desc">{project.description}</p>
              <div
                className="tag-list"
                data-count={project.tags.length}
                aria-label={`${project.name} tags`}
              >
                {project.tags.map((tag) => (
                  <span
                    className={`project-tag${activeTag === tag ? ' is-active' : ''}`}
                    key={tag}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
