import type { Project } from "./types";

export const projects: Project[] = [
  {
    slug: "cortex",
    name: "Cortex",
    oneLiner: "Company knowledge extraction platform that turns scattered data into AI-executable workflows.",
    tagline: "A company brain for AI agents",
    tech: ["Python", "FastAPI", "PostgreSQL", "ChromaDB", "HDBSCAN", "Groq / Llama 3.3", "Redis", "React"],
    github: "https://github.com/agrawal-2005/Cortex",
    highlights: [
      "283 automated tests across the ingestion and extraction pipeline",
      "~32ms query latency via local semantic search",
      "Deterministic safety validator that flags risky workflows before execution",
    ],
    featured: true,
    detail: {
      problem:
        "Company knowledge lives everywhere: docs, wikis, tickets, chat threads. When you want an AI agent to actually do something with that knowledge, raw text is not enough. The agent needs structured, verified workflows it can execute, and it needs them fast. Most RAG setups stop at retrieval and leave the hard part (turning retrieval into reliable action) unsolved.",
      solution:
        "Cortex ingests data from multiple sources with idempotent, deduplicated pipelines, then runs unsupervised extraction over the corpus. HDBSCAN clustering over vector embeddings surfaces the most relevant knowledge clusters upfront, so queries resolve in about 32ms through local semantic search instead of a round trip to a hosted vector service. Extracted workflows pass through a deterministic, agent-based safety validator that automatically flags anything risky that lacks an approval gate. The result is a knowledge base that agents can execute against, not just quote from.",
      stack: [
        { name: "Python + FastAPI", role: "Core API and extraction pipeline" },
        { name: "PostgreSQL", role: "Source of truth for structured workflows and ingestion state" },
        { name: "ChromaDB", role: "Local vector store for low-latency semantic search" },
        { name: "HDBSCAN", role: "Unsupervised clustering over embeddings to surface knowledge clusters" },
        { name: "Groq / Llama 3.3", role: "LLM inference for extraction and workflow synthesis" },
        { name: "Redis", role: "Message broker for Celery background ingestion and extraction jobs" },
        { name: "React", role: "Frontend for browsing clusters and reviewing flagged workflows" },
      ],
      decisions: [
        {
          title: "Local vector search over a hosted service",
          body: "Keeping ChromaDB local removed a network hop from every query. That is most of how query latency landed around 32ms. The tradeoff is managing persistence ourselves, which the ingestion layer's idempotency made manageable.",
        },
        {
          title: "Idempotent ingestion with cross-path deduplication",
          body: "The same document often arrives through multiple sources. Every ingestion path computes stable content hashes, so re-runs and overlapping sources never create duplicate knowledge. This made the pipeline safe to re-trigger blindly, which simplified operations a lot.",
        },
        {
          title: "Deterministic safety validation, not LLM-judged safety",
          body: "Asking an LLM whether a workflow is safe gives you probabilistic answers to a question that needs a guaranteed one. The validator is rule-based and deterministic: workflows touching sensitive operations without an approval gate get flagged, every time.",
        },
        {
          title: "Testing as a first-class deliverable",
          body: "283 automated tests cover ingestion idempotency, clustering behavior, and validator rules. For a pipeline whose whole value is reliability, the test suite is the product as much as the code is.",
        },
      ],
      metrics: [
        { label: "Automated tests", value: "283" },
        { label: "Query latency", value: "~32ms" },
        { label: "Ingestion", value: "Idempotent, multi-source" },
      ],
    },
  },
  {
    slug: "self-healing-system",
    name: "Self-Healing Distributed System",
    oneLiner: "Event-driven platform on AWS that detects and recovers failed microservices automatically.",
    tagline: "Microservices that fix themselves",
    tech: ["Python", "FastAPI", "Docker", "AWS Lambda", "EventBridge", "CloudWatch", "S3", "EC2"],
    github: "https://github.com/agrawal-2005/self-healing-system",
    highlights: [
      "Detects and recovers failed services in 5 to 30 seconds, no human in the loop",
      "Severity-aware recovery engine with circuit breakers and per-service strategies",
      "74 automated tests plus a 20-widget CloudWatch dashboard",
    ],
    featured: true,
    detail: {
      problem:
        "When a microservice dies at 3am, someone gets paged, ssh-es in, and restarts it. Most failures follow predictable patterns and have predictable fixes, yet the industry default is still waking a human up. I wanted to see how far automated recovery could go before a human genuinely needs to be involved.",
      solution:
        "An event-driven control loop built on FastAPI, Docker, and AWS. Health signals flow through EventBridge into a recovery engine that classifies failures by severity using sliding-window failure tracking, then applies a per-service strategy: restart, fall back, or escalate. Circuit breakers stop the system from hammering a service that keeps failing, and severity escalates automatically from LOW to CRITICAL as failures accumulate. Typical detection-to-recovery time is 5 to 30 seconds. Everything is observable through a 20-widget CloudWatch dashboard, and crash reports land in S3 for postmortems.",
      stack: [
        { name: "Python + FastAPI", role: "Health endpoints and the recovery control plane" },
        { name: "Docker", role: "Service isolation and restart primitives" },
        { name: "AWS Lambda", role: "Serverless recovery actions" },
        { name: "EventBridge", role: "Event bus routing failure signals to handlers" },
        { name: "CloudWatch", role: "Metrics, alarms, and the 20-widget operations dashboard" },
        { name: "S3", role: "Durable crash reports for post-incident analysis" },
        { name: "EC2", role: "Deployment target for the running system" },
      ],
      decisions: [
        {
          title: "Sliding-window failure tracking instead of simple thresholds",
          body: "A service failing 3 times in 10 seconds is a very different situation from 3 times in an hour. Tracking failures over a sliding window lets severity escalate from LOW to CRITICAL based on failure density, which maps much better to how incidents actually unfold.",
        },
        {
          title: "Circuit breakers around every recovery action",
          body: "The worst failure mode for a self-healing system is a restart loop that makes things worse. Circuit breakers open after repeated failed recoveries and force escalation instead, so the system knows when to stop trying and hand off.",
        },
        {
          title: "Per-service recovery strategies",
          body: "Restart is right for a stateless API but wrong for something mid-write. Each service declares its own strategy (restart, fallback, escalate), so recovery behavior matches what the service can actually tolerate.",
        },
        {
          title: "74 tests, including simulated failures",
          body: "Recovery code is code that runs when everything is already going wrong, so it has to be the most tested part of the system. The suite covers circuit-breaker state transitions and injected failure scenarios end to end.",
        },
      ],
      metrics: [
        { label: "Recovery time", value: "5-30s" },
        { label: "Automated tests", value: "74" },
        { label: "Dashboard", value: "20 CloudWatch widgets" },
      ],
    },
  },
  {
    slug: "windowshop-ai",
    name: "WindowShop_AI",
    oneLiner: "Real-time in-video product discovery: point at a product in a video, find it, buy it.",
    tagline: "See it in a video, find it in a click",
    tech: ["Python", "Flask", "PyTorch", "YOLOv8", "CLIP"],
    github: "https://github.com/agrawal-2005/WindowShop_AI",
    live: "https://windowshop-ai-demo.onrender.com",
    highlights: [
      "92% product identification accuracy with YOLOv8 + CLIP",
      "HackOn with Amazon: National Semifinalist, Top 10 teams",
      "Led a team of 3; owned the Flask backend and REST API design",
    ],
    featured: true,
    detail: {
      problem:
        "You see a product you like in a video and there is no way to find it short of screenshotting and reverse-image searching. For the HackOn with Amazon hackathon, we wanted discovery to happen inside the video itself, in real time, without breaking playback.",
      solution:
        "A detection-to-recommendation pipeline: YOLOv8 localizes products frame by frame, CLIP embeds each detection into a shared image-text space, and a similarity search matches it against a product catalog. The whole flow runs behind a Flask REST API that the video player calls as you watch. Product embeddings are precomputed and cached in PyTorch, so per-frame matching stays fast. The pipeline identifies products at 92% accuracy, and the project reached the national semifinals (Top 10 teams).",
      stack: [
        { name: "YOLOv8", role: "Real-time object detection on video frames" },
        { name: "CLIP", role: "Joint image-text embeddings for product matching" },
        { name: "PyTorch", role: "Model inference and cached embedding store" },
        { name: "OpenCV", role: "Frame extraction and preprocessing" },
        { name: "Flask", role: "REST API orchestrating detection to recommendation" },
        { name: "JavaScript", role: "In-player overlay UI" },
      ],
      decisions: [
        {
          title: "Precompute and cache product embeddings",
          body: "Embedding the catalog on every request would have made real-time matching impossible. Precomputing embeddings once and caching them in PyTorch turned per-frame matching into a fast similarity lookup, which is where most of the latency win came from.",
        },
        {
          title: "Two-stage detection then matching, not end-to-end",
          body: "Splitting the problem (YOLOv8 finds products, CLIP identifies them) meant each stage could be swapped and tuned independently. It also meant we could hit 92% accuracy with pretrained models instead of training something end to end during a hackathon.",
        },
        {
          title: "Backend as the contract for a team of 3",
          body: "I designed the REST API first so the ML and frontend work could proceed in parallel against a stable contract. In a hackathon, the API surface is the coordination mechanism.",
        },
      ],
      metrics: [
        { label: "Identification accuracy", value: "92%" },
        { label: "HackOn with Amazon", value: "Top 10 national" },
        { label: "Team", value: "3, led by me" },
      ],
    },
  },
  {
    slug: "genai-medical-chatbot",
    name: "GenAI Smart Medical Chatbot",
    oneLiner: "RAG chatbot that answers medical questions grounded in real documents, with multi-turn memory.",
    tagline: "Grounded answers, not hallucinations",
    tech: ["Python", "LangChain", "Llama 3.1", "Pinecone", "HuggingFace", "SQLite", "Flask"],
    github: "https://github.com/agrawal-2005/GENAI-Smart-Medical-Chatbot",
    live: "https://genai-smart-medical-chatbot.onrender.com",
    highlights: [
      "Full RAG pipeline: chunking, 384-dim embeddings, top-k semantic search",
      "SQLite-backed conversation memory for context-aware multi-turn chats",
      "Grounds every answer in retrieved medical documents to reduce hallucination",
    ],
    featured: true,
    detail: {
      problem:
        "A raw LLM asked a medical question will answer confidently whether or not it knows. In a medical context that is actively dangerous. The chatbot needed to ground every answer in actual medical documents and hold context across a multi-turn conversation, because health questions rarely come one at a time.",
      solution:
        "A RAG system orchestrated with LangChain: documents get chunked, embedded with 384-dimension HuggingFace sentence embeddings, and indexed in Pinecone. At question time, top-k semantic search retrieves the most relevant chunks and Llama 3.1 answers strictly from that context. Conversation history is persisted in SQLite, so follow-up questions ('what about the dosage?') resolve against everything said before. The whole thing is served through Flask and deployed live.",
      stack: [
        { name: "LangChain", role: "RAG orchestration: chunking, retrieval, prompt assembly" },
        { name: "Llama 3.1", role: "Answer generation grounded in retrieved context" },
        { name: "Pinecone", role: "Vector index for top-k semantic search" },
        { name: "HuggingFace", role: "384-dim sentence embeddings" },
        { name: "SQLite", role: "Persistent multi-turn conversation memory" },
        { name: "Flask", role: "API and chat interface" },
      ],
      decisions: [
        {
          title: "384-dim embeddings over larger models",
          body: "Smaller sentence embeddings kept indexing and retrieval fast and cheap. For chunk-level retrieval over a bounded medical corpus, the accuracy difference against larger embedding models did not justify the cost.",
        },
        {
          title: "SQLite for conversation memory",
          body: "Conversation state needs durability, not scale. SQLite gave persistent, queryable memory with zero infrastructure, which kept the deploy simple enough to run on a free-tier host.",
        },
        {
          title: "Retrieval-first prompting",
          body: "The prompt template instructs the model to answer only from retrieved chunks. Combined with top-k retrieval tuning, this is the main defense against the model inventing medical facts.",
        },
      ],
      metrics: [
        { label: "Embedding dims", value: "384" },
        { label: "Retrieval", value: "Top-k semantic" },
        { label: "Memory", value: "SQLite, multi-turn" },
      ],
    },
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
