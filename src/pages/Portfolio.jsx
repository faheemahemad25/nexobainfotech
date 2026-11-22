import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProjectCard, { ProjectThumbSvg } from '../components/ProjectCard';
import CtaBanner from '../components/CtaBanner';
import { CATEGORIES, PROJECTS, CAT_LABEL } from '../data/projectsData';
import { Search, X, ExternalLink, Calendar, Users, TrendingUp } from 'lucide-react';

export default function Portfolio() {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get('cat') || 'all';
  const [selectedCat, setSelectedCat] = useState(categoryParam);
  const [searchQuery, setSearchQuery] = useState('');
  const [modalProject, setModalProject] = useState(null);

  const handleTabChange = (key) => {
    setSelectedCat(key);
    if (key === 'all') {
      searchParams.delete('cat');
      setSearchParams(searchParams);
    } else {
      setSearchParams({ cat: key });
    }
  };

  const currentTab = CATEGORIES.find((c) => c.key === selectedCat) || CATEGORIES[0];

  const filteredProjects = useMemo(() => {
    return PROJECTS.filter((p) => {
      const matchCat = selectedCat === 'all' || p.cat === selectedCat;
      const query = searchQuery.trim().toLowerCase();
      const matchSearch =
        !query ||
        p.name.toLowerCase().includes(query) ||
        p.text.toLowerCase().includes(query) ||
        p.tags.some((t) => t.toLowerCase().includes(query));
      return matchCat && matchSearch;
    });
  }, [selectedCat, searchQuery]);

  const getCount = (key) => {
    if (key === 'all') return PROJECTS.length;
    return PROJECTS.filter((p) => p.cat === key).length;
  };

  return (
    <div>
      {/* Page Header */}
      <section className="page-head">
        <div className="wrap">
          <span className="eyebrow">Portfolio</span>
          <h1>Products We Have Built for Clients</h1>
          <p>
            Browse by type of product: SaaS platforms, two-sided marketplaces, high-conversion online stores,
            ERP &amp; CRM portals, and education technology.
          </p>
        </div>
      </section>

      {/* Main Portfolio Band */}
      <section className="band" style={{ paddingTop: '36px' }}>
        <div className="wrap">
          {/* Controls bar: Tabs and Search */}
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '16px', marginBottom: '8px' }}>
            <div className="tabs-scroll-container" style={{ margin: 0, border: 0, flex: 1, scrollbarWidth: 'none'}}>
              <div className="tabs-list" role="tablist" aria-label="Portfolio categories" >
                {CATEGORIES.map((tab) => {
                  const isSelected = selectedCat === tab.key;
                  return (
                    <button
                      key={tab.key}
                      type="button"
                      role="tab"
                      aria-selected={isSelected}
                      className={`tab-btn ${isSelected ? 'active' : ''}`}
                      onClick={() => handleTabChange(tab.key)}
                    >
                      {tab.label}
                      <span className="tab-count">{getCount(tab.key)}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quick Search */}
            <div style={{ position: 'relative', width: '100%', maxWidth: '280px' }}>
              <Search
                size={16}
                style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}
              />
              <input
                type="text"
                placeholder="Search projects or tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  padding: '9px 12px 9px 36px',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border)',
                  fontSize: '0.88rem',
                  outline: 'none',
                  background: '#fff',
                  fontFamily: 'inherit'
                }}
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  style={{
                    position: 'absolute',
                    right: '10px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: 'var(--text-muted)'
                  }}
                  aria-label="Clear search"
                >
                  <X size={15} />
                </button>
              )}
            </div>
          </div>

          <div style={{ borderBottom: '1px solid var(--border)', marginBottom: '16px' }}></div>

          {/* Tab Description */}
          <p className="tab-summary-text">
            {currentTab.blurb}
            {searchQuery && ` (Filtering by: "${searchQuery}")`}
          </p>

          {/* Projects Grid */}
          {filteredProjects.length > 0 ? (
            <div className="projects" role="tabpanel">
              {filteredProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onSelect={() => setModalProject(project)}
                />
              ))}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '60px 20px', background: 'var(--bg-card)', borderRadius: '12px', border: '1px solid var(--border)' }}>
              <p style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '6px' }}>
                No projects matched your criteria
              </p>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem' }}>
                Try resetting your search query or choosing another category.
              </p>
              <button
                type="button"
                className="btn btn-outline"
                onClick={() => { setSearchQuery(''); setSelectedCat('all'); }}
                style={{ marginTop: '16px' }}
              >
                Reset filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Project Details Modal */}
      {modalProject && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={modalProject.name}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 100,
            background: 'rgba(28, 5, 12, 0.65)',
            backdropFilter: 'blur(6px)',
            display: 'grid',
            placeItems: 'center',
            padding: '20px'
          }}
          onClick={() => setModalProject(null)}
        >
          <div
            style={{
              background: '#fff',
              maxWidth: '680px',
              width: '100%',
              borderRadius: '16px',
              overflow: 'hidden',
              boxShadow: 'var(--shadow-lg)',
              border: '1px solid var(--border)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header Preview */}
            <div style={{ position: 'relative', borderBottom: '1px solid var(--border)' }}>
              <ProjectThumbSvg cat={modalProject.cat} />
              <button
                type="button"
                onClick={() => setModalProject(null)}
                style={{
                  position: 'absolute',
                  top: '14px',
                  right: '14px',
                  background: 'rgba(255,255,255,0.9)',
                  border: '1px solid var(--border)',
                  borderRadius: '50%',
                  width: '36px',
                  height: '36px',
                  display: 'grid',
                  placeItems: 'center',
                  cursor: 'pointer',
                  color: 'var(--text-primary)'
                }}
                aria-label="Close modal"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Body */}
            <div style={{ padding: '26px 30px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px', marginBottom: '8px' }}>
                <span className="pill">{CAT_LABEL[modalProject.cat]}</span>
                <span style={{ fontSize: '0.84rem', color: 'var(--text-muted)' }}>Delivered {modalProject.year}</span>
              </div>

              <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '12px' }}>{modalProject.name}</h2>
              <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '20px' }}>
                {modalProject.text}
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '14px', padding: '16px', background: 'var(--enterprise-blue-subtle)', borderRadius: '10px', marginBottom: '22px' }}>
                <div>
                  <span style={{ fontSize: '0.76rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Client Sector</span>
                  <div style={{ fontWeight: 600, color: 'var(--text-primary)', marginTop: '2px' }}>{modalProject.client}</div>
                </div>
                <div>
                  <span style={{ fontSize: '0.76rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Key Metric</span>
                  <div style={{ fontWeight: 600, color: 'var(--primary)', marginTop: '2px' }}>{modalProject.impact}</div>
                </div>
              </div>

              <div style={{ marginBottom: '24px' }}>
                <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-primary)' }}>Architecture &amp; Features:</span>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '8px' }}>
                  {modalProject.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      style={{
                        fontSize: '0.8rem',
                        padding: '4px 11px',
                        background: '#fff',
                        border: '1px solid var(--border)',
                        borderRadius: '6px',
                        color: 'var(--text-secondary)'
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                <button type="button" className="btn btn-outline" onClick={() => setModalProject(null)}>
                  Close
                </button>
                <a href="#/contact" className="btn btn-primary" onClick={() => setModalProject(null)}>
                  Build something similar
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CTA Band */}
      <CtaBanner
        title="Want something like this for your business?"
        description="Share your idea with us and we will tell you how we would architect, design, and build it."
        buttonText="Start a project"
        buttonLink="/contact"
      />
    </div>
  );
}
