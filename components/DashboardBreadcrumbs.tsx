//components/DashboardBreadcrumbs.tsx
interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface DashboardBreadcrumbsProps {
  items: BreadcrumbItem[];
}

export default function DashboardBreadcrumbs({ items }: DashboardBreadcrumbsProps) {
  return (
    <nav className="dashboard-breadcrumbs">
      {items.map((item, index) => (
        <span key={index}>
          {item.href ? (
            <a href={item.href}>{item.label}</a>
          ) : (
            <span className="breadcrumb-current">{item.label}</span>
          )}
          {index < items.length - 1 && <span className="breadcrumb-separator">/</span>}
        </span>
      ))}
    </nav>
  );
}
