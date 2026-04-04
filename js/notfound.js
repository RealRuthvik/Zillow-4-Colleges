export function renderNotFound(container) {
  container.innerHTML = '';
  container.className = 'page page-enter';

  const wrap = document.createElement('div');
  wrap.style.cssText = `
    min-height: 80vh; 
    display: flex; 
    flex-direction: column; 
    align-items: center; 
    justify-content: center; 
    text-align: center; 
    padding: 40px;
  `;

  wrap.innerHTML = `
    <div class="animate-slam" style="position: relative; margin-bottom: 20px;">
      <h1 style="font-family: var(--font-heading); font-size: clamp(100px, 15vw, 180px); color: var(--red); line-height: 1; text-shadow: 6px 6px 0px var(--black); margin: 0;">404</h1>
      <div style="position: absolute; top: 50%; left: -15%; right: -15%; height: 10px; background: var(--white); transform: translateY(-50%) rotate(-8deg); z-index: 1;"></div>
    </div>
    
    <h2 class="animate-fade-up stagger-2" style="font-family: var(--font-heading); font-size: clamp(24px, 5vw, 40px); color: var(--white); margin-bottom: 16px; text-transform: uppercase;">
      Truth Not Found
    </h2>
    
    <p class="animate-fade-up stagger-3" style="color: var(--grey-light); max-width: 480px; margin-bottom: 24px; line-height: 1.6; font-size: 16px;">
      The page or college profile you are looking for does not exist in our database. It might have been removed, or the URL is incorrect.
    </p>

    <div class="animate-fade-up stagger-4" style="background: rgba(255,255,255,0.03); border: 1px solid var(--grey-mid); padding: 24px; max-width: 480px; margin-bottom: 32px;">
      <h3 style="font-family: var(--font-sub); font-size: 14px; text-transform: uppercase; color: var(--white); margin-bottom: 8px; letter-spacing: 2px;">Know about this college?</h3>
      <p style="color: var(--grey-light); font-size: 14px; line-height: 1.5; margin-bottom: 16px;">
        Help the community by submitting placement realities. If you have verified data or personal experience, add it to the platform.
      </p>
      <a href="/submit" data-link class="admin-btn admin-btn--primary" style="text-decoration: none; display: inline-block;">SUBMIT INFO</a>
    </div>

    <div class="animate-fade-up stagger-5">
      <a href="/" data-link class="admin-btn admin-btn--ghost" style="text-decoration: none; display: inline-block;">RETURN TO HOME</a>
    </div>
  `;

  container.appendChild(wrap);
}