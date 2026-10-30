import { NavLink, Navigate, useParams } from 'react-router-dom';
import { BookOpen, FileText, Ruler } from 'lucide-react';
import SizeGuide from './SizeGuide';
import Help from './Help';
import Terms from './Terms';
import { useI18n } from '../i18n';

/* One "Help Guide" page with three tabs: Size guide (default), Help & policies, Terms & conditions. */
const TABS = [
  { id: 'size-guide', key: 'tab.size', Icon: Ruler, Page: SizeGuide },
  { id: 'policies', key: 'tab.policies', Icon: BookOpen, Page: Help },
  { id: 'terms', key: 'tab.terms', Icon: FileText, Page: Terms },
];

export default function HelpHub() {
  const { t } = useI18n();
  const { tab } = useParams();
  const current = TABS.find((x) => x.id === tab);
  if (!current) return <Navigate to="/help/size-guide" replace />;
  const { Page } = current;
  return (
    <div className="help-hub">
      <div className="container">
        <div className="tabs" role="tablist" aria-label={t('nav.helpGuide')}>
          {TABS.map(({ id, key, Icon }) => (
            <NavLink key={id} to={`/help/${id}`} role="tab" aria-selected={id === current.id} className={id === current.id ? 'tab on' : 'tab'}>
              <Icon size={17} /> {t(key)}
            </NavLink>
          ))}
        </div>
      </div>
      <Page key={current.id} />
    </div>
  );
}
