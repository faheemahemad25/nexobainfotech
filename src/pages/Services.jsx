import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ServiceCard from '../components/ServiceCard';
import CtaBanner from '../components/CtaBanner';
import { SERVICES } from '../data/servicesData';
import { Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';

export default function Services() {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredServices = activeCategory === "all"
    ? SERVICES
    : SERVICES.filter((s) => s.key === activeCategory);

  return (
    <div>
      {/* Page Header */}
      <section className="page-head">
        <div className="wrap">
          <span className="eyebrow">Services</span>
          <h1>What Nexoba Infotech Builds</h1>
          <p>
            Mobile and web products, AI workflows that do real enterprise work, and the core platforms businesses run on.
            Pick a focused service or combine several into an integrated end-to-end project.
          </p>
        </div>
      </section>

      {/* Filter / Quick Jump Bar */}
      <div style={{ background: '#fff', borderBottom: '1px solid var(--border)', position: 'sticky', top: 'var(--header-height)', zIndex: 30 }}>
        <div className="wrap" style={{ overflowX: 'auto', paddingBlock: '8px', scrollbarWidth: 'none'}}>
          <div style={{ display: 'flex', gap: '8px', minWidth: 'max-content' }}>
            <button
              onClick={() => setActiveCategory("all")}
              style={{
                appearance: 'none',
                border: '1px solid',
                borderColor: activeCategory === 'all' ? 'var(--primary)' : 'var(--border)',
                background: activeCategory === 'all' ? 'var(--enterprise-blue-subtle)' : '#fff',
                color: activeCategory === 'all' ? 'var(--primary)' : 'var(--text-secondary)',
                fontWeight: activeCategory === 'all' ? 600 : 500,
                padding: '6px 14px',
                borderRadius: '99px',
                fontSize: '0.86rem',
                cursor: 'pointer',
                transition: 'all 0.18s'
              }}
            >
              All Services ({SERVICES.length})
            </button>
            {SERVICES.map((s) => (
              <button
                key={s.key}
                onClick={() => setActiveCategory(s.key)}
                style={{
                  appearance: 'none',
                  border: '1px solid',
                  borderColor: activeCategory === s.key ? 'var(--primary)' : 'var(--border)',
                  background: activeCategory === s.key ? 'var(--enterprise-blue-subtle)' : '#fff',
                  color: activeCategory === s.key ? 'var(--primary)' : 'var(--text-secondary)',
                  fontWeight: activeCategory === s.key ? 600 : 500,
                  padding: '6px 14px',
                  borderRadius: '99px',
                  fontSize: '0.86rem',
                  cursor: 'pointer',
                  transition: 'all 0.18s'
                }}
              >
                {s.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Service List */}
      <section className="band" style={{ paddingTop: '32px' }}>
        <div className="wrap">
          <div style={{ borderBottom: '1px solid var(--border)' }}>
            {filteredServices.map((service) => (
              <ServiceCard key={service.id} service={service} mode="row" />
            ))}
          </div>
        </div>
      </section>

      {/* Cross-Cutting Capabilities */}
      <section className="band band-tint">
        <div className="wrap">
          <div className="section-head">
            <div>
              <span className="eyebrow">Enterprise Standards</span>
              <h2>Included in every project we deliver</h2>
              <p>Regardless of technology stack, our deliverables meet strict engineering benchmarks.</p>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
            <div style={{ background: '#fff', padding: '24px', borderRadius: '12px', border: '1px solid var(--border)' }}>
              <div style={{ color: 'var(--primary)', marginBottom: '10px' }}><CheckCircle2 size={24} /></div>
              <h4 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '6px' }}>Tested &amp; Quality Controlled</h4>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>Automated test suites covering unit logic, API endpoints, and critical end-to-end user journeys.</p>
            </div>

            <div style={{ background: '#fff', padding: '24px', borderRadius: '12px', border: '1px solid var(--border)' }}>
              <div style={{ color: 'var(--primary)', marginBottom: '10px' }}><CheckCircle2 size={24} /></div>
              <h4 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '6px' }}>Performance Optimized</h4>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>Lightning-fast server response times, responsive lazy-loaded assets, and optimized database indexing.</p>
            </div>

            <div style={{ background: '#fff', padding: '24px', borderRadius: '12px', border: '1px solid var(--border)' }}>
              <div style={{ color: 'var(--primary)', marginBottom: '10px' }}><CheckCircle2 size={24} /></div>
              <h4 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '6px' }}>Documented &amp; Transferable</h4>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>Comprehensive architecture guides, API OpenAPI/Swagger documentation, and full code ownership.</p>
            </div>

            <div style={{ background: '#fff', padding: '24px', borderRadius: '12px', border: '1px solid var(--border)' }}>
              <div style={{ color: 'var(--primary)', marginBottom: '10px' }}><CheckCircle2 size={24} /></div>
              <h4 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '6px' }}>Cloud DevOps Ready</h4>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>Containerized with Docker, automated GitHub Actions CI/CD pipelines, and cloud monitoring configs.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Band */}
      <CtaBanner
        title="Not sure which service fits your project?"
        description="Describe the problem you're trying to solve and we will suggest the simplest, most cost-effective route to solving it."
        buttonText="Talk to us"
        buttonLink="/contact"
      />
    </div>
  );
}
