'use client';

import * as React from 'react';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from '@/components/ui/sidebar';
import { useAuth } from '@/context/AuthContext';
import { NavMain } from '@/features/sidebar/components/nav-main';
import { NavUser } from '@/features/sidebar/components/nav-user';
import { TeamSwitcher } from '@/features/sidebar/components/team-switcher';
import { sidebarData } from '@/features/sidebar/data/sidebar-data';
import { Languages } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user, logout } = useAuth();
  const { t, i18n } = useTranslation(['sidebar', 'common']);
  const currentLang = i18n.resolvedLanguage?.startsWith('fr') ? 'fr' : 'en';
  const nextLang = currentLang === 'en' ? 'fr' : 'en';

  return (
    <Sidebar collapsible='icon' {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={sidebarData.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={sidebarData.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              tooltip={t('language.switchTo', { lang: nextLang.toUpperCase() })}
              aria-label={t('language.ariaLabel', { lang: nextLang.toUpperCase() })}
              onClick={() => void i18n.changeLanguage(nextLang)}
            >
              <Languages />
              <span>{t('language.label', { lang: currentLang.toUpperCase() })}</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <NavUser
          user={{
            name: user?.username ?? t('user.defaultName'),
            email: user?.email ?? '',
            avatar: '',
          }}
          onLogout={() => void logout()}
        />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
