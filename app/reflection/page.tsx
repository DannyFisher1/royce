"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ReflectionPage() {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.2, duration: 0.5 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.section
      className="container mx-auto max-w-6xl py-20 px-4 space-y-16"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.header variants={itemVariants} className="text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tight hover:underline decoration-muted-foreground">
          Our Thoughts on AI Safety
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Perspectives and insights from our team on AI safety practices and experiences.
        </p>
      </motion.header>

      <motion.div variants={itemVariants} className="space-y-8">
        <h2 className="text-2xl font-semibold text-center sm:text-left">User Reflections</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {/* Reflection Card 1 */}
          <motion.div variants={itemVariants} whileInView="visible" initial="hidden">
            <Card className="bg-muted border border-border shadow-md rounded-2xl transition-transform hover:scale-[1.02]">
              <CardHeader>
                <CardTitle>Reflection 1: Jeb</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose prose-neutral dark:prose-invert max-h-[40rem] overflow-y-auto">
                  <p>
                    AI safety means ensuring that AI systems are reliable, ethical, and aligned with human values. In
                    practice, it focuses on preventing accidents, misuse, or other harmful outcomes that can arise
                    while using AI. 
                    <br />
                    <br />
                    In short, it involves designing AI to serve people's needs without causing harm.
                    <br />
                    <br />
                    This concept highlights how technology development influences society and why responsible design and
                    oversight matter. A few key safety terms include bias, misinformation, control, and unexpected
                    outcomes. 
                    <br />
                    <br />
                    Ensuring AI safety means building technology that intentionally promotes human well-being
                    with the design being ethnographically centered. 
                    <br />
                    <br />
                    Developers should use ethical guidelines and oversight to align AI with human values. For example, frameworks are proposed to keep AI behavior
                    within moral principles and reduce risks. 
                    <br />
                    <br />
                    These measures help ensure AI improves lives only when developed carefully, with diverse perspectives, robust oversight, and ethical standards. 
                    <br />
                    <br />
                    We know that AI safety directly affects our future. We realize we must consider who designs these systems,
                    how they work, and who might be harmed by them. 
                    <br />
                    <br />
                    By focusing on fairness, transparency, and accountability, we can ensure AI has positive outcomes. In this way, AI safety connects to responsible innovation and human well-being, ensuring a better future for society.
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Reflection Card 2 */}
          <motion.div variants={itemVariants} whileInView="visible" initial="hidden">
            <Card className="bg-muted border border-border shadow-md rounded-2xl transition-transform hover:scale-[1.02]">
              <CardHeader>
                <CardTitle>Reflection 2: Lawrenz</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose prose-neutral dark:prose-invert max-h-[40rem] overflow-y-auto">
                  <p>
                    AI safety is important and part of developing a responsible Artificial Intelligence. 
                    <br />
                    <br />
                    From what I've seen in my use of AI, there are a lot of good safety measures already in place. 
                    <br />
                    <br />
                    An example would be how most AI systems won't let you ask for instructions on how to do or create something dangerous
                    or illegal. This shows that developers take human safety seriously especially of a tool that can be
                    seen as knowledgeable. 
                    <br />
                    <br />
                    As AI continues to get powerful and integrated into our lives, it's important to make sure it doesn't cause harm whether intentional or unintentional. 
                    <br />
                    <br />
                    However, I've also noticed that these safety measures aren't always perfect. Sometimes, with the right wording or
                    phrasing, people can still get around the system. I've even tried to do it, not to do anything
                    harmful, but just to see how the system reacts and I've realized there are loopholes. 
                    <br />
                    <br />
                    That makes me think AI safety isn't just about putting restrictions in place, but also about constantly updating
                    and improving them as people figure out ways to work around the rules. 
                    <br />
                    <br />
                    I personally use AI almost everyday, asking random questions, school work, etc. Most of the time it works well and gives
                    helpful answers. 
                    <br />
                    <br />
                    But that ease of use is also why safety is so important. If anyone can ask
                    anything at any time, we have to make sure the system can handle that responsibly. It's clear that
                    different AI companies have different approaches for safety. Some are transparent about their
                    methods and others seem to focus on the reliability and innovation of AI. 
                    <br />
                    <br />
                    I think it is definitely important to find a balance between the progress of AI but also the responsibility behind it. 
                    <br />
                    <br />
                    AI safety isn't a one-time fix and is still an ongoing challenge, but as someone who uses AI often, I
                    think the potential is worth putting in the effort to get it right.
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Reflection Card 3 */}
          <motion.div variants={itemVariants} whileInView="visible" initial="hidden">
            <Card className="bg-muted border border-border shadow-md rounded-2xl transition-transform hover:scale-[1.02]">
              <CardHeader>
                <CardTitle>Reflection 3: Daniel</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose prose-neutral dark:prose-invert max-h-[40rem] overflow-y-auto">
                  <p>
                  It feels like the boundaries of AI safety are becoming increasingly unclear over time. What was acceptable yesterday might not be tomorrow, and vice versa. 
                  <br />
                  <br />
                  This project has shown that the power these LLM's carry is much larger than just knowledge. The more powerful and polished these models become, the more tempting it is to rely on them—often without questioning the hidden assumptions, biases, or ethical blind spots they carry. 
                  <br />
                  <br />
                  As trust in them grows, so too does the potential for misuse or unintended consequences. This is extremely dangerous as it is hard to decipher between what is real versus what the models creators indent for the output to be. 
                  <br />
                  <br />
                  As we saw through the various providers it is clear that some really do care about safety in every sense of the word. Others… Not so much. While there has been some sort of alignment between many of the major providers with the SOC 2 or Safety Pledge there is not an actual requirement for these models to adhere to. Furthermore, open-sourced models like LLama4 only make it easier for people at home to take advantage of these models.   
                  <br />
                  <br />
                  I don't see a problem with individuals using these models however they choose, particularly when the models are open source. What is concerning is when companies, large or small embed their own agendas or ideologies into the models without disclosing it to users. 
                  <br />
                  <br />
                  Reflecting on this project, it became clear that even though some of the top-rated models had notable safety lapses (like GPT-4o's content issues or Gemini's jailbreaks), the companies behind them were transparent and took action to address them. That level of accountability is rarely seen in lower-rated or open-source models—mainly because there's no one truly watching.  
                  <br />
                  <br />
                  I think the key takeaway from all of this is that you need to be the judge of what is safe. You can never fully rely on a generative system to be correct, <em>especially</em> when they might come with a preset bias.
                  <br />
                  <br />
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </motion.div>
    </motion.section>
  );
}
