// pages/about.js
"use client"
import About from '@/app/components/About';
import { Navbar } from '@/app/components/navbar';

export default function AboutPage() {
  return (
    <div>
        <Navbar/>
      <About />
    </div>
  );
}
