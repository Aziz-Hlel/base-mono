import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@/components/ui/sidebar';
import type { SidebarNavItem } from '@/features/sidebar/data/sidebar-data';
import { ChevronRightIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router';

export function NavMain({ items }: { items: SidebarNavItem[] }) {
  const { t } = useTranslation(['sidebar', 'common']);
  const { pathname } = useLocation();

  return (
    <SidebarGroup>
      <SidebarGroupLabel>{t('nav.platform')}</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => {
          const title = t(item.title);
          const hasSubItems = Boolean(item.items && item.items.length > 0);
          const isGroupActive =
            pathname === item.url || Boolean(item.items?.some((sub) => sub.url === pathname));

          if (!hasSubItems) {
            return (
              <SidebarMenuItem key={item.url}>
                <SidebarMenuButton asChild tooltip={title} isActive={pathname === item.url}>
                  <Link to={item.url}>
                    {item.icon}
                    <span>{title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          }

          return (
            <Collapsible
              key={item.url}
              asChild
              defaultOpen={item.isActive || isGroupActive}
              className='group/collapsible'
            >
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton tooltip={title} isActive={isGroupActive}>
                    {item.icon}
                    <span>{title}</span>
                    <ChevronRightIcon className='ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90' />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    {item.items?.map((subItem) => (
                      <SidebarMenuSubItem key={subItem.url}>
                        <SidebarMenuSubButton asChild isActive={pathname === subItem.url}>
                          <Link to={subItem.url}>
                            <span>{t(subItem.title)}</span>
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
