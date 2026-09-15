import { Hero } from '../components/sections/Hero';
import { Stats } from '../components/sections/Stats';
import { Problem } from '../components/sections/Problem';
import { Manifesto } from '../components/sections/Manifesto';
import { Showcase } from '../components/sections/Showcase';
import { YearJourney } from '../components/sections/YearJourney';
import { Bento } from '../components/sections/Bento';
import { Roles } from '../components/sections/Roles';
import { Languages } from '../components/sections/Languages';
import { Steps } from '../components/sections/Steps';
import { Security } from '../components/sections/Security';
import { Testimonials } from '../components/sections/Testimonials';
import { Pricing } from '../components/sections/Pricing';
import { Faq } from '../components/sections/Faq';
import { Contact } from '../components/sections/Contact';

export function Home() {
  return (
    <main>
      <Hero />
      <Stats />
      <Problem />
      <Manifesto />
      <Showcase />
      <Bento />
      <Roles />
      <YearJourney />
      <Languages />
      <Steps />
      <Security />
      <Testimonials />
      <Pricing />
      <Faq />
      <Contact />
    </main>
  );
}
