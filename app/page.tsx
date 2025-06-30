'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Mic, MessageSquare, Code, Rocket, ArrowRight, Play, Sparkles } from 'lucide-react'

export default function Home() {
  const pipelineSteps = [
    {
      icon: Mic,
      title: "Voice Command",
      description: "Speak your development needs naturally",
      color: "from-green-400 to-blue-500",
      delay: 0
    },
    {
      icon: MessageSquare,
      title: "Slack Integration",
      description: "Voice converts to text and routes to Slack",
      color: "from-purple-400 to-pink-500",
      delay: 0.2
    },
    {
      icon: Code,
      title: "Cursor Agents",
      description: "AI agents analyze and generate code",
      color: "from-blue-400 to-cyan-500",
      delay: 0.4
    },
    {
      icon: Rocket,
      title: "Auto Deploy",
      description: "Code is built and deployed automatically",
      color: "from-orange-400 to-red-500",
      delay: 0.6
    }
  ]

  const features = [
    {
      title: "Natural Voice Commands",
      description: "Just speak what you want to build - no complex syntax required",
      icon: "🎙️"
    },
    {
      title: "Slack-First Workflow",
      description: "Integrate seamlessly with your team's communication hub",
      icon: "💬"
    },
    {
      title: "AI-Powered Code Generation",
      description: "Advanced agents understand context and generate production-ready code",
      icon: "🤖"
    },
    {
      title: "Instant Deployment",
      description: "From voice to production in minutes, not hours",
      icon: "⚡"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-20"></div>
        <div className="relative container mx-auto px-6 py-24">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="w-20 h-20 mx-auto mb-8 relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cursor-blue to-slack-purple rounded-full opacity-20 animate-pulse-slow"></div>
              <Sparkles className="w-20 h-20 text-gradient-start" />
            </motion.div>
            
            <h1 className="text-6xl md:text-7xl font-bold mb-6">
              <span className="gradient-text">Voice to Deploy</span>
              <br />
              <span className="text-white">in Minutes</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-12 leading-relaxed">
              Experience the future of development with AI-powered background agents
              <br />
              Transform voice commands into deployed applications through Slack & Cursor
            </p>
            
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(103, 126, 234, 0.4)" }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-gradient-start to-gradient-end px-12 py-4 rounded-full text-white font-semibold text-lg flex items-center gap-3 mx-auto hover:shadow-2xl transition-all duration-300"
            >
              <Play className="w-6 h-6" />
              See Demo Pipeline
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Pipeline Section */}
      <section className="py-24 relative">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold gradient-text mb-6">
              The Pipeline
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Four seamless steps from voice command to live deployment
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {pipelineSteps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: step.delay }}
                whileHover={{ y: -10 }}
                className="glass-card p-8 text-center group hover:shadow-2xl transition-all duration-300"
              >
                <div className="relative mb-6">
                  <div className={`w-16 h-16 mx-auto rounded-full bg-gradient-to-r ${step.color} p-4 group-hover:scale-110 transition-transform duration-300`}>
                    <step.icon className="w-8 h-8 text-white" />
                  </div>
                  {index < pipelineSteps.length - 1 && (
                    <div className="hidden lg:block absolute top-8 left-full w-8 h-0.5 bg-gradient-to-r from-white/50 to-transparent">
                      <ArrowRight className="absolute -top-2 -right-2 w-4 h-4 text-white/50" />
                    </div>
                  )}
                </div>
                
                <h3 className="text-2xl font-bold mb-4 text-white group-hover:gradient-text transition-all duration-300">
                  {step.title}
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-black/20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold gradient-text mb-6">
              Why Background Agents?
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Revolutionary features that transform how you build and deploy applications
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="glass-card p-8 hover:shadow-2xl transition-all duration-300 group"
              >
                <div className="flex items-start gap-6">
                  <div className="text-4xl group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-4 text-white group-hover:gradient-text transition-all duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-gray-300 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="glass-card p-12 max-w-4xl mx-auto text-center"
          >
            <h2 className="text-4xl font-bold gradient-text mb-8">
              Ready to Experience the Future?
            </h2>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Join thousands of developers who are already building faster with voice-powered AI agents
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-cursor-blue to-cyan-500 px-8 py-4 rounded-full text-white font-semibold hover:shadow-2xl transition-all duration-300"
              >
                Start with Cursor
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-slack-purple to-purple-600 px-8 py-4 rounded-full text-white font-semibold hover:shadow-2xl transition-all duration-300"
              >
                Integrate with Slack
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 text-center text-gray-400">
        <div className="container mx-auto px-6">
          <p className="text-lg">
            Built with ❤️ using Cursor Background Agents
          </p>
          <p className="mt-2">
            The future of development is here.
          </p>
        </div>
      </footer>
    </div>
  )
}