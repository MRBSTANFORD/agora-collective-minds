
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star, Quote } from 'lucide-react';

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Product Strategy Lead",
      company: "TechFlow Inc",
      content: "Got 8 different expert perspectives on our product roadmap in 30 minutes instead of weeks of stakeholder meetings. The philosophical and scientific angles I never would have considered on my own.",
      avatar: "SC",
      rating: 5
    },
    {
      name: "Marcus Rodriguez",
      role: "Innovation Consultant",
      company: "Strategic Futures",
      content: "I was skeptical about AI 'historical minds' until I tried it with a client's sustainability challenge. The diverse viewpoints from different eras created breakthrough solutions we're now implementing.",
      avatar: "MR",
      rating: 5
    },
    {
      name: "Dr. Priya Patel",
      role: "Research Director",
      company: "BioTech Solutions",
      content: "Turned my complex ethical dilemma about gene therapy into a clear decision framework. Having Kant, Confucius, and modern thinkers debate the issue was incredibly illuminating.",
      avatar: "PP",
      rating: 5
    },
    {
      name: "James Mitchell",
      role: "Startup Founder",
      company: "GreenTech Ventures",
      content: "Never thought about my business model from a Renaissance master's perspective! The creative solutions that emerged from this multi-generational think tank were game-changing.",
      avatar: "JM",
      rating: 5
    }
  ];

  return (
    <section className="py-20 relative">
      <div className="text-center mb-16">
        <div className="flex items-center justify-center mb-8">
          <img 
            src="/lovable-uploads/d82ffa24-857d-498f-927d-b12fd2bd58a6.png" 
            alt="AGORA Logo" 
            className="w-12 h-12 object-contain mr-4 opacity-80"
          />
          <h3 className="text-4xl font-thin tracking-wider text-slate-800">Voices from the Future</h3>
        </div>
        <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto mb-4"></div>
        <p className="text-slate-600 font-light text-lg">
          *Early access testimonials - AGORA is new, so we've created these examples to show potential outcomes
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {testimonials.map((testimonial, index) => (
          <Card key={index} className="relative bg-white/90 backdrop-blur-sm border-slate-200 hover:shadow-xl transition-all duration-500 overflow-hidden">
            {/* Greek column effect */}
            <div className="absolute top-0 left-4 w-0.5 h-full bg-gradient-to-b from-amber-300 to-transparent opacity-30"></div>
            <div className="absolute top-0 right-4 w-0.5 h-full bg-gradient-to-b from-slate-300 to-transparent opacity-30"></div>
            
            <CardContent className="p-8">
              <div className="flex items-start space-x-4 mb-6">
                <Avatar className="w-12 h-12">
                  <AvatarFallback className="bg-gradient-to-br from-slate-600 to-slate-800 text-white font-medium">
                    {testimonial.avatar}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h4 className="font-medium text-slate-800">{testimonial.name}</h4>
                  <p className="text-sm text-slate-600">{testimonial.role}</p>
                  <p className="text-xs text-amber-600 font-medium">{testimonial.company}</p>
                </div>
                <div className="flex space-x-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
              </div>
              
              <div className="relative">
                <Quote className="absolute -top-2 -left-2 w-8 h-8 text-amber-200" />
                <p className="text-slate-700 leading-relaxed font-light italic pl-6">
                  "{testimonial.content}"
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="text-center mt-12">
        <p className="text-sm text-slate-500 font-light">
          Join the pioneers exploring collective intelligence • Experience the power of historical wisdom
        </p>
      </div>
    </section>
  );
};

export default TestimonialsSection;
