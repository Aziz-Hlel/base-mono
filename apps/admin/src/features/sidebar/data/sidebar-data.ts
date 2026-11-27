import type { ParseKeys } from 'i18next';
import { Building2Icon, GalleryVerticalEndIcon, HandshakeIcon, MailIcon } from 'lucide-react';
import { createElement, type ReactNode } from 'react';

export type SidebarTranslationKey = ParseKeys<'sidebar'>;

export interface SidebarSubItem {
  title: SidebarTranslationKey;
  url: string;
}

export interface SidebarNavItem {
  title: SidebarTranslationKey;
  url: string;
  icon?: ReactNode;
  isActive?: boolean;
  items?: SidebarSubItem[];
}

export interface SidebarTeam {
  name: string;
  logo: ReactNode;
  plan: SidebarTranslationKey;
}

export const sidebarData: {
  teams: SidebarTeam[];
  navMain: SidebarNavItem[];
} = {
  teams: [
    {
      name: 'Excellense',
      logo: createElement(GalleryVerticalEndIcon),
      plan: 'team.adminConsole',
    },
  ],
  navMain: [
    {
      title: 'nav.contacts',
      url: '/home',
      icon: createElement(MailIcon),
    },
    {
      title: 'nav.exhibitorEnquiries',
      url: '/exhibitor-enquiries',
      icon: createElement(Building2Icon),
    },
    {
      title: 'nav.sponsorEnquiries',
      url: '/sponsor-enquiries',
      icon: createElement(HandshakeIcon),
    },
  ],
};

export interface BreadcrumbTrail {
  parent: { title: SidebarTranslationKey; url: string };
  current: SidebarTranslationKey;
}

export const getBreadcrumbs = (pathname: string): BreadcrumbTrail => {
  for (const item of sidebarData.navMain) {
    if (item.url === pathname) {
      return {
        parent: { title: 'nav.platform', url: '/home' },
        current: item.title,
      };
    }

    const matchedSub = item.items?.find((sub) => sub.url === pathname);
    if (matchedSub) {
      return {
        parent: { title: item.title, url: item.url },
        current: matchedSub.title,
      };
    }
  }

  return {
    parent: { title: 'nav.platform', url: '/home' },
    current: 'nav.dashboard',
  };
};
