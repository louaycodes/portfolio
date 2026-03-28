import { Injectable } from '@angular/core';

export interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  images: string[];
  githubUrl: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private projects: Project[] = [
    {
      id: 'cluverse',
      title: 'Cluverse — Club Management Platform',
      description:
        'A full-stack SaaS platform that streamlines university club operations including member management, event scheduling, and election workflows. Built with an Angular frontend and a secure Spring Boot REST API backend connected to a PostgreSQL database.',
      techStack: ['Angular', 'Spring Boot', 'PostgreSQL', 'Docker', 'JWT'],
      images: [
        'https://placehold.co/800x450/0d1117/00E676?text=Cluverse',
        'https://placehold.co/800x450/0d1117/c8d0dc?text=Cluverse+Detail'
      ],
      githubUrl: 'https://github.com/louayzorai/cluverse'
    },
    {
      id: 'ai-prompt-manager',
      title: 'AI Prompt Manager',
      description:
        'An AI-native utility embedded directly inside ChatGPT that helps users turn unclear or incomplete requests into clear, structured instructions before content is generated. Leverages FastMCP and Langbase to orchestrate multi-step prompt enrichment pipelines.',
      techStack: ['Python', 'FastMCP', 'Langbase', 'OpenAI API', 'LangChain'],
      images: [
        'https://placehold.co/800x450/0d1117/00E676?text=AI+Prompt+Manager',
        'https://placehold.co/800x450/0d1117/c8d0dc?text=Prompt+Manager+Detail'
      ],
      githubUrl: 'https://github.com/louayzorai/ai-prompt-manager'
    },
    {
      id: 'portfolio',
      title: 'Portfolio — This Site',
      description:
        'My personal developer portfolio built with Angular using a clean feature-based NgModules architecture with lazy loading. Features a dark techy aesthetic, responsive design, and project showcase with dynamic routing.',
      techStack: ['Angular', 'TypeScript', 'CSS3', 'NgModules'],
      images: [
        'https://placehold.co/800x450/0d1117/00E676?text=Portfolio',
        'https://placehold.co/800x450/0d1117/c8d0dc?text=Portfolio+Detail'
      ],
      githubUrl: 'https://github.com/louayzorai/portfolio'
    }
  ];

  getAll(): Project[] {
    return this.projects;
  }

  getById(id: string): Project | undefined {
    return this.projects.find(p => p.id === id);
  }
}
