const demos = {
  davos: {
    nav: "DAVOS",
    title: "SIM / DAVOS runtime trace",
    summary: "A browser-native replay of how freshness-aware middleware changes the vehicle data path under load.",
    scenarios: [
      {
        label: "Baseline",
        detail: "Conventional middleware path under light traffic.",
        accent: "#276c8f",
        vehicle: "Baseline vehicle",
        packetLabel: "queue grows",
        metrics: [
          ["Latency", "84 ms"],
          ["Freshness", "72%"],
          ["Stop margin", "4.1 ft"],
          ["Mode", "baseline"],
        ],
        events: [
          ["00:00", "Camera and LiDAR frames enter the baseline middleware path."],
          ["00:02", "Packet queue grows before planning receives a synchronized frame."],
          ["00:04", "Vehicle keeps a narrow stopping margin during the braking event."],
        ],
      },
      {
        label: "Congested",
        detail: "Baseline transport under bursty perception traffic.",
        accent: "#9f4538",
        vehicle: "Congested baseline",
        packetLabel: "stale bursts",
        metrics: [
          ["Latency", "142 ms"],
          ["Freshness", "51%"],
          ["Stop margin", "1.8 ft"],
          ["Mode", "burst load"],
        ],
        events: [
          ["00:00", "Perception bursts compete with control-critical messages."],
          ["00:02", "Planner receives stale world state during the emergency-brake window."],
          ["00:04", "Trace flags a low-margin intervention point."],
        ],
      },
      {
        label: "DAVOS",
        detail: "Freshness-aware transport prioritizes control-critical data.",
        accent: "#2f7d5b",
        vehicle: "DAVOS vehicle",
        packetLabel: "fresh path",
        metrics: [
          ["Latency", "2 ms"],
          ["Freshness", "98%"],
          ["Stop margin", "13.6 ft"],
          ["Mode", "freshness-aware"],
        ],
        events: [
          ["00:00", "Control-critical streams are routed through the freshness-aware path."],
          ["00:02", "Planner receives the newest available perception state."],
          ["00:04", "Emergency-brake trace keeps a wider stopping margin."],
        ],
      },
    ],
  },
  ipi: {
    nav: "IPI",
    title: "IPI / OpenIntersection control loop",
    summary: "Operate a software-defined intersection and inspect how signal phase, MAP/SPaT state, and API calls change together.",
    scenarios: [
      {
        label: "Normal flow",
        detail: "North-south green with standard SPaT broadcast.",
        accent: "#2f7d5b",
        phase: "NS green",
        metrics: [
          ["Signal phase", "NS green"],
          ["SPaT age", "42 ms"],
          ["MAP lanes", "12"],
          ["IPI action", "observe"],
        ],
        events: [
          ["api", "GET /intersection/phase returns north-south green."],
          ["spat", "Broadcast encodes movement state for through lanes."],
          ["map", "Lane geometry remains stable for the current intersection tile."],
        ],
      },
      {
        label: "Priority request",
        detail: "Connected vehicle requests an east-west phase extension.",
        accent: "#a96718",
        phase: "EW extension",
        metrics: [
          ["Signal phase", "EW extend"],
          ["SPaT age", "36 ms"],
          ["MAP lanes", "12"],
          ["IPI action", "extend phase"],
        ],
        events: [
          ["api", "POST /phase-extension validates vehicle approach and ETA."],
          ["spat", "SPaT timer extends the east-west movement window."],
          ["safety", "Conflict monitor keeps protected left turns red."],
        ],
      },
      {
        label: "Conflict check",
        detail: "The roadside API rejects a conflicting movement request.",
        accent: "#9f4538",
        phase: "Protected hold",
        metrics: [
          ["Signal phase", "hold"],
          ["SPaT age", "48 ms"],
          ["MAP lanes", "12"],
          ["IPI action", "reject conflict"],
        ],
        events: [
          ["api", "POST /movement-request detects a protected-turn conflict."],
          ["safety", "Intersection keeps both conflicting movements locked out."],
          ["spat", "Broadcast sends a hold state with explicit conflict reason."],
        ],
      },
    ],
  },
  carscenes: {
    nav: "CARScenes",
    title: "CARScenes semantic browser",
    summary: "Filter a small scene set and inspect the kind of attributes, object labels, and VLM tasks captured by the dataset workflow.",
    scenarios: [
      {
        label: "Rainy urban",
        detail: "Wet road, occluded pedestrian, signalized intersection.",
        accent: "#276c8f",
        metrics: [
          ["Samples", "1,284"],
          ["Attributes", "rain, night"],
          ["Objects", "18"],
          ["Task", "risk QA"],
        ],
        events: [
          ["filter", "weather: rain; infrastructure: signalized intersection."],
          ["label", "Pedestrian and vehicle boxes are paired with visibility attributes."],
          ["task", "Question asks which actor creates the highest near-term risk."],
        ],
      },
      {
        label: "Construction",
        detail: "Cones, lane closure, worker zone, temporary path.",
        accent: "#a96718",
        metrics: [
          ["Samples", "932"],
          ["Attributes", "work zone"],
          ["Objects", "26"],
          ["Task", "path QA"],
        ],
        events: [
          ["filter", "scene type: construction; lane state: partially closed."],
          ["label", "Temporary lane boundary and cones are separated from permanent markings."],
          ["task", "Question asks whether the ego lane remains valid."],
        ],
      },
      {
        label: "Occlusion",
        detail: "Parked vehicle blocks vulnerable-road-user visibility.",
        accent: "#9f4538",
        metrics: [
          ["Samples", "611"],
          ["Attributes", "occluded"],
          ["Objects", "14"],
          ["Task", "visibility QA"],
        ],
        events: [
          ["filter", "visibility: partial; occluder: parked vehicle."],
          ["label", "Occlusion relation is attached to the hidden actor."],
          ["task", "Question asks what evidence supports a cautious maneuver."],
        ],
      },
    ],
  },
  "dt-world": {
    nav: "DT_World",
    title: "DT_World layer viewer",
    summary: "Toggle between precomputed LiDAR, mesh, semantic material, and road-map layers in a compact digital-twin scene.",
    scenarios: [
      {
        label: "LiDAR pass",
        detail: "Synchronized point stream aligned with the road tile.",
        accent: "#276c8f",
        metrics: [
          ["Layer", "LiDAR"],
          ["Tiles", "18"],
          ["Objects", "31"],
          ["Map", "raw pass"],
        ],
        events: [
          ["sync", "Timestamped vehicle data aligns with the selected road tile."],
          ["points", "LiDAR points keep lane boundary and curb structure visible."],
          ["manifest", "Object manifest indexes dynamic actors for later layers."],
        ],
      },
      {
        label: "Mesh build",
        detail: "Road mesh and PBR surfaces generated from the synchronized pass.",
        accent: "#2f7d5b",
        metrics: [
          ["Layer", "mesh"],
          ["Tiles", "18"],
          ["Objects", "31"],
          ["Map", "OpenDRIVE"],
        ],
        events: [
          ["mesh", "Road surface is tiled into reusable mesh chunks."],
          ["material", "PBR texture assignment separates asphalt, curb, and lane paint."],
          ["map", "OpenDRIVE lane topology is attached to the tile set."],
        ],
      },
      {
        label: "Semantic view",
        detail: "Semantic materials and object manifests are layered for evaluation.",
        accent: "#a96718",
        metrics: [
          ["Layer", "semantic"],
          ["Tiles", "18"],
          ["Objects", "31"],
          ["Map", "labeled"],
        ],
        events: [
          ["semantic", "Drivable surface, curb, signs, and actors receive material classes."],
          ["query", "Evaluator can select actors and inspect their synchronized metadata."],
          ["export", "Scene exports as a compact test artifact for simulation."],
        ],
      },
    ],
  },
  blueice: {
    nav: "BlueICE",
    title: "BlueICE co-simulation loop",
    summary: "Step through a reproducible autonomous-driving experiment spanning traffic simulation, vehicle simulation, autonomy, and hardware-in-the-loop state.",
    scenarios: [
      {
        label: "Co-sim sync",
        detail: "CARLA, SUMO, and Autoware advance on the same tick.",
        accent: "#2f7d5b",
        metrics: [
          ["Clock skew", "4 ms"],
          ["Sim rate", "0.94x"],
          ["Modules", "4/4"],
          ["Trace", "synced"],
        ],
        events: [
          ["tick", "SUMO traffic update is aligned to the CARLA scene tick."],
          ["bridge", "Autoware receives ego pose and surrounding actor states."],
          ["record", "Experiment artifacts are logged with deterministic tick IDs."],
        ],
      },
      {
        label: "HIL mode",
        detail: "Hardware endpoint is inserted into the same scenario loop.",
        accent: "#276c8f",
        metrics: [
          ["Clock skew", "12 ms"],
          ["Sim rate", "0.82x"],
          ["Modules", "5/5"],
          ["Trace", "HIL"],
        ],
        events: [
          ["device", "Hardware endpoint subscribes to the scenario topic bridge."],
          ["bridge", "Autoware and device state share the same replay clock."],
          ["record", "HIL latency is written beside simulation-side events."],
        ],
      },
      {
        label: "Fault replay",
        detail: "A sensor delay is injected and replayed reproducibly.",
        accent: "#9f4538",
        metrics: [
          ["Clock skew", "38 ms"],
          ["Sim rate", "0.71x"],
          ["Modules", "4/5"],
          ["Trace", "fault"],
        ],
        events: [
          ["inject", "Synthetic sensor delay is applied at a deterministic tick."],
          ["observe", "Planner receives delayed obstacle state for the replay window."],
          ["record", "Fault trace is saved for repeatable evaluation."],
        ],
      },
    ],
  },
  icat: {
    nav: "ICAT",
    title: "ICAT indoor testbed map",
    summary: "Switch between indoor autonomy modes on a compact connected-vehicle testbed map with localization, infrastructure, and course-demo state.",
    scenarios: [
      {
        label: "Localization",
        detail: "Indoor vehicle follows a route with vision-assisted pose correction.",
        accent: "#276c8f",
        metrics: [
          ["Pose drift", "0.18 m"],
          ["Vehicles", "2"],
          ["Beacons", "6"],
          ["Mode", "localize"],
        ],
        events: [
          ["pose", "Vehicle pose is fused from indoor landmarks and LiDAR odometry."],
          ["route", "The route remains inside the lab-scale map boundary."],
          ["teach", "Students can inspect drift and correction events."],
        ],
      },
      {
        label: "V2X lab",
        detail: "Roadside node broadcasts signal and zone state to vehicles.",
        accent: "#2f7d5b",
        metrics: [
          ["Pose drift", "0.22 m"],
          ["Vehicles", "3"],
          ["Beacons", "6"],
          ["Mode", "V2X"],
        ],
        events: [
          ["rsu", "Indoor roadside node publishes a protected-zone message."],
          ["vehicle", "Vehicle controller receives a reduced-speed zone update."],
          ["teach", "The same setup supports Autoware education exercises."],
        ],
      },
      {
        label: "Demo run",
        detail: "Course-facing run with scripted obstacle and recovery behavior.",
        accent: "#a96718",
        metrics: [
          ["Pose drift", "0.27 m"],
          ["Vehicles", "2"],
          ["Beacons", "6"],
          ["Mode", "teaching"],
        ],
        events: [
          ["obstacle", "A scripted obstacle appears in the indoor driving lane."],
          ["recover", "The vehicle waits, replans, and clears the blocked area."],
          ["teach", "Event log is used to explain autonomy stack behavior."],
        ],
      },
    ],
  },
  startaxi: {
    nav: "STARTaxi",
    title: "STARTaxi / HydraU dispatch flow",
    summary: "A compact operator-side demo of an academic robotaxi trip: dispatch, autonomous segment, and handoff state.",
    scenarios: [
      {
        label: "Dispatch",
        detail: "Passenger request is assigned to the STAR Campus vehicle.",
        accent: "#276c8f",
        metrics: [
          ["Trip state", "assigned"],
          ["Vehicle", "HydraU"],
          ["ETA", "3 min"],
          ["Mode", "operator"],
        ],
        events: [
          ["request", "Passenger requests pickup from the STAR Campus stop."],
          ["assign", "Operator assigns HydraU and confirms route availability."],
          ["stack", "Autoware mission state is prepared for the route."],
        ],
      },
      {
        label: "Autonomous",
        detail: "Vehicle executes the campus route under autonomy supervision.",
        accent: "#2f7d5b",
        metrics: [
          ["Trip state", "in service"],
          ["Vehicle", "HydraU"],
          ["ETA", "1 min"],
          ["Mode", "autonomous"],
        ],
        events: [
          ["route", "Vehicle follows the mapped campus segment."],
          ["monitor", "Operator dashboard watches localization and drive mode."],
          ["passenger", "Rider app displays route progress and vehicle status."],
        ],
      },
      {
        label: "Handoff",
        detail: "Trip completes and the platform records the service event.",
        accent: "#a96718",
        metrics: [
          ["Trip state", "complete"],
          ["Vehicle", "HydraU"],
          ["ETA", "0 min"],
          ["Mode", "handoff"],
        ],
        events: [
          ["arrive", "Vehicle reaches the destination stop."],
          ["handoff", "Operator confirms the trip completion state."],
          ["record", "Service trace is logged for later platform analysis."],
        ],
      },
    ],
  },
};

const elements = {
  title: document.querySelector("[data-demo-title]"),
  summary: document.querySelector("[data-demo-summary]"),
  scenarios: document.querySelector("[data-scenarios]"),
  visual: document.querySelector("[data-visual]"),
  metrics: document.querySelector("[data-metrics]"),
  events: document.querySelector("[data-events]"),
  run: document.querySelector("[data-run-trace]"),
  timeline: document.querySelector("[data-timeline]"),
  nav: Array.from(document.querySelectorAll("[data-demo-nav]")),
};

let activeDemoId = new URLSearchParams(location.search).get("demo") || "davos";
let activeScenario = 0;
let tracePosition = 0;
let traceTimer = null;

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function getDemo(id) {
  return demos[id] || demos.davos;
}

function setDemo(id, updateUrl = true) {
  activeDemoId = demos[id] ? id : "davos";
  activeScenario = 0;
  tracePosition = 0;
  elements.timeline.value = 0;
  stopTrace();

  if (updateUrl) {
    history.replaceState(null, "", `?demo=${activeDemoId}`);
  }

  render();
}

function setScenario(index) {
  activeScenario = index;
  tracePosition = 0;
  elements.timeline.value = 0;
  stopTrace();
  render();
}

function stopTrace() {
  if (traceTimer) {
    clearInterval(traceTimer);
    traceTimer = null;
  }
  elements.run.textContent = "Run trace";
}

function runTrace() {
  if (traceTimer) {
    stopTrace();
    return;
  }

  elements.run.textContent = "Pause trace";
  traceTimer = setInterval(() => {
    tracePosition = (tracePosition + 4) % 104;
    if (tracePosition > 100) {
      activeScenario = (activeScenario + 1) % getDemo(activeDemoId).scenarios.length;
      tracePosition = 0;
    }
    elements.timeline.value = tracePosition;
    render();
  }, 220);
}

function render() {
  const demo = getDemo(activeDemoId);
  const scenario = demo.scenarios[activeScenario];
  const progress = Number(tracePosition) / 100;

  document.title = `${demo.nav} Demo | Yuankai (William) He`;
  elements.title.textContent = demo.title;
  elements.summary.textContent = demo.summary;

  elements.nav.forEach((button) => {
    const isActive = button.dataset.demoNav === activeDemoId;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });

  elements.scenarios.innerHTML = demo.scenarios.map((item, index) => `
    <button class="scenario-button${index === activeScenario ? " is-active" : ""}" type="button" data-scenario="${index}" aria-pressed="${index === activeScenario}">
      <strong>${escapeHtml(item.label)}</strong>
      <span>${escapeHtml(item.detail)}</span>
    </button>
  `).join("");

  elements.metrics.innerHTML = scenario.metrics.map(([label, value]) => `
    <div><dt>${escapeHtml(label)}</dt><dd>${escapeHtml(value)}</dd></div>
  `).join("");

  elements.events.innerHTML = scenario.events.map(([time, text]) => `
    <div><strong>${escapeHtml(time)}</strong> ${escapeHtml(text)}</div>
  `).join("");

  elements.visual.innerHTML = renderWorkbench(activeDemoId, scenario, progress);
}

function renderWorkbench(id, scenario, progress) {
  const telemetry = getTelemetry(id, scenario, progress);
  return `
    <div class="stage-toolbar">
      <div class="stage-clock">
        <strong>${escapeHtml(telemetry.mode)}</strong>
        <span>${escapeHtml(telemetry.clock)}</span>
        <small>${escapeHtml(telemetry.status)}</small>
      </div>
      <div class="topic-strip" aria-label="Active topics and data streams">
        ${telemetry.topics.map((topic, index) => `
          <span class="topic-pill" style="color: ${index === 0 ? scenario.accent : "var(--blue)"}">${escapeHtml(topic)}</span>
        `).join("")}
      </div>
    </div>
    <div class="visual-stack">
      <div class="primary-visual">${renderVisual(id, scenario, progress)}</div>
      <div class="diagnostic-grid">
        <div class="trace-card">
          <h3>Trace channels</h3>
          <div class="channel-grid">
            ${telemetry.channels.map(([label, level]) => `
              <div class="channel-row">
                <strong>${escapeHtml(label)}</strong>
                <div class="channel-bar" style="--accent: ${scenario.accent}; --level: ${Math.max(6, Math.min(100, level))}%"><span></span></div>
                <span>${Math.round(level)}%</span>
              </div>
            `).join("")}
          </div>
        </div>
        <div class="trace-card">
          <h3>Message preview</h3>
          <div class="message-preview">
            ${telemetry.message.map(([key, value]) => `
              <div><strong>${escapeHtml(key)}</strong><span>${escapeHtml(value)}</span></div>
            `).join("")}
          </div>
        </div>
      </div>
    </div>
  `;
}

function getTelemetry(id, scenario, progress) {
  const clock = `t+${(progress * 8.4).toFixed(2)}s`;
  const phase = scenario.label.toLowerCase().replaceAll(" ", "_");
  const base = {
    mode: "Replay workbench",
    clock,
    status: "Deterministic browser replay using precomputed project states.",
    topics: ["/clock", "/project/state", "/trace/events"],
    channels: [
      ["state update", 48 + progress * 42],
      ["message age", 35 + (1 - progress) * 38],
      ["trace confidence", 68 + progress * 18],
    ],
    message: [
      ["scenario", phase],
      ["timestamp", clock],
      ["event_source", id],
    ],
  };

  const table = {
    davos: {
      mode: "Vehicle runtime replay",
      status: "Comparing baseline transport with freshness-aware DAVOS scheduling.",
      topics: ["/sensing/lidar_packets", "/planning/trajectory", "/davos/freshness", "/vehicle/brake_cmd"],
      channels: [
        ["sensor queue", scenario.label === "DAVOS" ? 24 + progress * 12 : 54 + progress * 38],
        ["freshness score", scenario.label === "DAVOS" ? 86 + progress * 10 : 48 + progress * 24],
        ["control margin", scenario.label === "Congested" ? 22 + progress * 16 : 58 + progress * 32],
      ],
      message: [
        ["frame_id", "ud_av/front_lidar"],
        ["policy", scenario.label === "DAVOS" ? "freshness_priority" : "fifo_transport"],
        ["deadline", scenario.label === "Congested" ? "miss_risk=true" : "met=true"],
      ],
    },
    ipi: {
      mode: "Roadside API replay",
      status: "Software-defined intersection state with SPaT/MAP and conflict checks.",
      topics: ["/rsu/spat", "/rsu/map", "/ipi/request", "/conflict_monitor/state"],
      channels: [
        ["phase timer", 38 + progress * 45],
        ["spat freshness", 82 - progress * 12],
        ["conflict guard", scenario.label === "Conflict check" ? 96 : 58 + progress * 22],
      ],
      message: [
        ["movement", scenario.phase || scenario.label],
        ["api_result", scenario.label === "Conflict check" ? "409 conflict" : "200 accepted"],
        ["intersection_id", "open_intersection_01"],
      ],
    },
    carscenes: {
      mode: "Dataset curation browser",
      status: "Semantic scene filter with object attributes and VLM evaluation tasks.",
      topics: ["/scene/index", "/annotations/objects", "/attributes/query", "/vlm/task"],
      channels: [
        ["filter match", 44 + progress * 44],
        ["object density", scenario.label === "Construction" ? 82 : 54 + progress * 24],
        ["annotation coverage", 74 + progress * 16],
      ],
      message: [
        ["split", "validation/static_demo"],
        ["scene_tag", scenario.label.toLowerCase()],
        ["query", scenario.metrics[3][1]],
      ],
    },
    "dt-world": {
      mode: "Digital twin layer stack",
      status: "Precomputed road tile, point cloud, mesh, semantic material, and OpenDRIVE layers.",
      topics: ["/lidar/points", "/mesh/tile_set", "/semantic/materials", "/opendrive/lane_graph"],
      channels: [
        ["tile loaded", 62 + progress * 28],
        ["semantic layer", scenario.label === "Semantic view" ? 92 : 32 + progress * 26],
        ["mesh coverage", scenario.label === "LiDAR pass" ? 38 + progress * 20 : 74 + progress * 18],
      ],
      message: [
        ["tile_id", "star_campus_block_04"],
        ["active_layer", scenario.metrics[0][1]],
        ["export", scenario.label === "LiDAR pass" ? "raw_sync" : "sim_ready"],
      ],
    },
    blueice: {
      mode: "Co-simulation replay",
      status: "CARLA, SUMO, Autoware, HIL endpoint, and recorder state in one deterministic loop.",
      topics: ["/blueice/tick", "/carla/actors", "/sumo/traffic", "/autoware/ego_state", "/hil/device"],
      channels: [
        ["clock sync", scenario.label === "Fault replay" ? 44 + progress * 12 : 78 + progress * 16],
        ["bridge load", scenario.label === "HIL mode" ? 72 + progress * 18 : 48 + progress * 20],
        ["record health", scenario.label === "Fault replay" ? 58 : 84 + progress * 8],
      ],
      message: [
        ["scenario", scenario.label.toLowerCase()],
        ["tick_id", String(1200 + Math.round(progress * 240))],
        ["replay", scenario.label === "Fault replay" ? "sensor_delay.injected" : "nominal"],
      ],
    },
    icat: {
      mode: "Indoor testbed replay",
      status: "Lab-scale autonomy map with localization, infrastructure messages, and teaching run state.",
      topics: ["/icat/pose", "/icat/beacons", "/icat/rsu_zone", "/autoware/route"],
      channels: [
        ["pose stability", scenario.label === "Localization" ? 82 + progress * 10 : 66 + progress * 18],
        ["v2x update", scenario.label === "V2X lab" ? 88 : 40 + progress * 24],
        ["route progress", 24 + progress * 66],
      ],
      message: [
        ["map", "icat_indoor_loop"],
        ["mode", scenario.metrics[3][1]],
        ["pose_sigma", scenario.metrics[0][1]],
      ],
    },
    startaxi: {
      mode: "Robotaxi dispatch replay",
      status: "Operator-side state for campus pickup, autonomous route progress, and service handoff.",
      topics: ["/dispatch/request", "/hydrau/mission", "/autoware/mode", "/rider/status"],
      channels: [
        ["route progress", 20 + progress * 76],
        ["operator confidence", scenario.label === "Autonomous" ? 84 + progress * 8 : 62 + progress * 18],
        ["passenger state", scenario.label === "Handoff" ? 96 : 40 + progress * 36],
      ],
      message: [
        ["vehicle", "HydraU"],
        ["trip_state", scenario.metrics[0][1]],
        ["service", "star_campus_demo"],
      ],
    },
  };

  return { ...base, ...(table[id] || {}) };
}

function renderVisual(id, scenario, progress) {
  const renderers = {
    davos: renderDavos,
    ipi: renderIpi,
    carscenes: renderCarScenes,
    "dt-world": renderDtWorld,
    blueice: renderBlueIce,
    icat: renderIcat,
    startaxi: renderStartaxi,
  };
  return (renderers[id] || renderDavos)(scenario, progress);
}

function renderDavos(scenario, progress) {
  const x = 110 + progress * 600;
  const color = scenario.accent;
  const queue = scenario.label === "DAVOS" ? 2 : scenario.label === "Baseline" ? 5 : 8;
  const packets = Array.from({ length: queue }, (_, index) => {
    const px = 140 + index * 36;
    const py = 110 + (index % 2) * 28;
    return `<rect x="${px}" y="${py}" width="26" height="18" rx="4" fill="${color}" opacity="${0.35 + index * 0.06}"/>`;
  }).join("");

  return `
    <svg class="demo-svg" viewBox="0 0 900 520" role="img" aria-label="DAVOS runtime trace">
      <rect x="34" y="36" width="832" height="448" rx="18" fill="#fbfcfa" stroke="#d9ded5"/>
      <text x="66" y="78" class="svg-title">${escapeHtml(scenario.vehicle)}</text>
      <text x="66" y="104" class="svg-label">${escapeHtml(scenario.packetLabel)}</text>
      <line x1="86" y1="330" x2="812" y2="330" stroke="#ccd4ca" stroke-width="28" stroke-linecap="round"/>
      <line x1="86" y1="330" x2="812" y2="330" stroke="#ffffff" stroke-width="3" stroke-dasharray="18 18"/>
      <rect x="${x}" y="288" width="92" height="48" rx="12" fill="${color}"/>
      <circle cx="${x + 22}" cy="344" r="10" fill="#172026"/>
      <circle cx="${x + 72}" cy="344" r="10" fill="#172026"/>
      <path d="M${x + 18} 288 L${x + 38} 260 H${x + 76} L${x + 92} 288 Z" fill="${color}" opacity="0.82"/>
      <g>${packets}</g>
      <path d="M118 220 C220 ${180 - progress * 40}, 320 ${260 - progress * 80}, 430 ${220 - progress * 70} S650 ${170 + progress * 40}, 760 ${132 + progress * 70}" fill="none" stroke="${color}" stroke-width="5" stroke-linecap="round"/>
      <text x="108" y="414" class="svg-label">sensor frames</text>
      <text x="344" y="414" class="svg-label">planner state</text>
      <text x="606" y="414" class="svg-label">control output</text>
      <circle cx="142" cy="386" r="13" fill="#276c8f"/>
      <circle cx="388" cy="386" r="13" fill="#a96718"/>
      <circle cx="654" cy="386" r="13" fill="#2f7d5b"/>
    </svg>
  `;
}

function renderIpi(scenario, progress) {
  const color = scenario.accent;
  const nsGreen = scenario.phase.includes("NS");
  const ewGreen = scenario.phase.includes("EW");
  const carX = 190 + progress * 170;
  const carY = 265 + progress * 40;

  return `
    <svg class="demo-svg" viewBox="0 0 900 520" role="img" aria-label="IPI intersection state">
      <rect x="34" y="36" width="832" height="448" rx="18" fill="#fbfcfa" stroke="#d9ded5"/>
      <rect x="390" y="70" width="120" height="380" fill="#d7ded6"/>
      <rect x="110" y="250" width="680" height="120" fill="#d7ded6"/>
      <line x1="450" y1="70" x2="450" y2="450" stroke="#ffffff" stroke-width="4" stroke-dasharray="18 16"/>
      <line x1="110" y1="310" x2="790" y2="310" stroke="#ffffff" stroke-width="4" stroke-dasharray="18 16"/>
      <circle cx="354" cy="218" r="16" fill="${nsGreen ? "#2f7d5b" : "#9f4538"}"/>
      <circle cx="548" cy="386" r="16" fill="${ewGreen ? "#2f7d5b" : "#9f4538"}"/>
      <rect x="${carX}" y="${carY}" width="64" height="34" rx="8" fill="${color}"/>
      <rect x="${650 - progress * 80}" y="196" width="64" height="34" rx="8" fill="#276c8f" opacity="0.88"/>
      <rect x="610" y="80" width="176" height="90" rx="10" fill="#ffffff" stroke="#d9ded5"/>
      <text x="632" y="116" class="svg-title">IPI request</text>
      <text x="632" y="142" class="svg-small">${escapeHtml(scenario.phase)}</text>
      <path d="M612 172 C570 220, 540 245, 508 270" fill="none" stroke="${color}" stroke-width="4" stroke-dasharray="8 8"/>
      <text x="112" y="92" class="svg-label">SPaT/MAP broadcast</text>
      <rect x="112" y="110" width="202" height="74" rx="10" fill="#ffffff" stroke="#d9ded5"/>
      <text x="132" y="144" class="svg-small">movement_state: ${escapeHtml(scenario.phase)}</text>
      <text x="132" y="164" class="svg-small">conflict_monitor: active</text>
    </svg>
  `;
}

function renderCarScenes(scenario, progress) {
  const color = scenario.accent;
  const focus = Math.round(progress * 2);
  const samples = [
    ["vehicle", 118, 172, 142, 70],
    ["pedestrian", 356, 134, 66, 132],
    ["signal", 594, 112, 90, 60],
  ];
  const boxes = samples.map(([label, x, y, w, h], index) => `
    <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="4" fill="none" stroke="${index === focus ? color : "#276c8f"}" stroke-width="${index === focus ? 5 : 3}"/>
    <text x="${x}" y="${y - 10}" class="svg-small">${label}</text>
  `).join("");

  return `
    <svg class="demo-svg" viewBox="0 0 900 520" role="img" aria-label="CARScenes semantic sample browser">
      <rect x="34" y="36" width="832" height="448" rx="18" fill="#fbfcfa" stroke="#d9ded5"/>
      <rect x="82" y="86" width="620" height="280" rx="14" fill="#e6ebe7" stroke="#d9ded5"/>
      <path d="M82 300 C220 260, 360 250, 702 304" stroke="#ffffff" stroke-width="22" fill="none"/>
      <path d="M82 303 C220 263, 360 253, 702 307" stroke="#ccd4ca" stroke-width="2" fill="none" stroke-dasharray="16 14"/>
      ${boxes}
      <rect x="724" y="86" width="92" height="280" rx="14" fill="#ffffff" stroke="#d9ded5"/>
      <text x="744" y="122" class="svg-title">filters</text>
      <text x="744" y="154" class="svg-small">${escapeHtml(scenario.label)}</text>
      <text x="744" y="178" class="svg-small">objects</text>
      <text x="744" y="202" class="svg-small">attributes</text>
      <text x="744" y="226" class="svg-small">QA task</text>
      <rect x="82" y="394" width="734" height="58" rx="12" fill="#ffffff" stroke="#d9ded5"/>
      <text x="108" y="430" class="svg-label">Selected sample: ${escapeHtml(scenario.detail)}</text>
    </svg>
  `;
}

function renderDtWorld(scenario, progress) {
  const color = scenario.accent;
  const points = Array.from({ length: 46 }, (_, index) => {
    const x = 102 + ((index * 73) % 650);
    const y = 126 + ((index * 47) % 260);
    const size = 2 + (index % 3);
    return `<circle cx="${x}" cy="${y}" r="${size}" fill="${color}" opacity="${0.35 + (index % 5) * 0.1}"/>`;
  }).join("");
  const meshOpacity = scenario.label === "LiDAR pass" ? 0.18 : 0.72;
  const semantic = scenario.label === "Semantic view";

  return `
    <svg class="demo-svg" viewBox="0 0 900 520" role="img" aria-label="DT World layer viewer">
      <rect x="34" y="36" width="832" height="448" rx="18" fill="#fbfcfa" stroke="#d9ded5"/>
      <g opacity="${meshOpacity}">
        <path d="M108 360 L250 182 L420 210 L608 146 L786 292 L650 392 L408 410 Z" fill="#dfe8e2" stroke="#8ba99a" stroke-width="2"/>
        <path d="M250 182 L408 410 M420 210 L650 392 M608 146 L408 410" stroke="#8ba99a" stroke-width="1.5"/>
      </g>
      <path d="M118 336 C280 260, 424 282, 760 214" stroke="${semantic ? "#2f7d5b" : "#ffffff"}" stroke-width="26" fill="none" stroke-linecap="round"/>
      <path d="M118 336 C280 260, 424 282, 760 214" stroke="#a96718" stroke-width="2" fill="none" stroke-dasharray="18 14"/>
      ${points}
      <rect x="602" y="360" width="186" height="72" rx="12" fill="#ffffff" stroke="#d9ded5"/>
      <text x="626" y="392" class="svg-title">${escapeHtml(scenario.label)}</text>
      <text x="626" y="416" class="svg-small">trace ${(progress * 100).toFixed(0)}%</text>
      <text x="92" y="94" class="svg-label">LiDAR points + tiled mesh + map layers</text>
    </svg>
  `;
}

function renderBlueIce(scenario, progress) {
  const color = scenario.accent;
  const modules = ["SUMO", "CARLA", "Autoware", "HIL", "Recorder"];
  const activeIndex = Math.min(modules.length - 1, Math.floor(progress * modules.length));
  const blocks = modules.map((name, index) => {
    const x = 92 + index * 150;
    const active = index <= activeIndex;
    return `
      <rect x="${x}" y="194" width="112" height="86" rx="14" fill="${active ? color : "#ffffff"}" opacity="${active ? 0.92 : 1}" stroke="#d9ded5"/>
      <text x="${x + 24}" y="242" class="svg-title" fill="${active ? "#ffffff" : "#172026"}">${name}</text>
      ${index < modules.length - 1 ? `<path d="M${x + 118} 237 H${x + 142}" stroke="#5a6670" stroke-width="3" marker-end="url(#arrow)"/>` : ""}
    `;
  }).join("");

  return `
    <svg class="demo-svg" viewBox="0 0 900 520" role="img" aria-label="BlueICE co-simulation loop">
      <defs><marker id="arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L0,6 L6,3 z" fill="#5a6670"/></marker></defs>
      <rect x="34" y="36" width="832" height="448" rx="18" fill="#fbfcfa" stroke="#d9ded5"/>
      <text x="82" y="94" class="svg-title">${escapeHtml(scenario.label)}</text>
      <text x="82" y="120" class="svg-label">deterministic tick ${(progress * 100).toFixed(0)}%</text>
      ${blocks}
      <rect x="108" y="352" width="${620 * progress + 40}" height="18" rx="9" fill="${color}" opacity="0.78"/>
      <rect x="108" y="352" width="660" height="18" rx="9" fill="none" stroke="#d9ded5"/>
      <text x="108" y="414" class="svg-label">scenario clock, bridge state, and experiment log advance together</text>
    </svg>
  `;
}

function renderIcat(scenario, progress) {
  const color = scenario.accent;
  const vehicleX = 154 + progress * 520;
  const vehicleY = 330 - Math.sin(progress * Math.PI) * 130;
  const beacons = [[150, 150], [300, 110], [520, 132], [720, 168], [224, 392], [668, 386]];
  const beaconMarkup = beacons.map(([x, y]) => `<circle cx="${x}" cy="${y}" r="10" fill="#ffffff" stroke="#276c8f" stroke-width="3"/>`).join("");

  return `
    <svg class="demo-svg" viewBox="0 0 900 520" role="img" aria-label="ICAT indoor testbed map">
      <rect x="34" y="36" width="832" height="448" rx="18" fill="#fbfcfa" stroke="#d9ded5"/>
      <rect x="100" y="92" width="700" height="340" rx="16" fill="#eef2ed" stroke="#d9ded5"/>
      <path d="M146 332 C260 146, 410 126, 536 224 S690 360, 750 248" fill="none" stroke="#ffffff" stroke-width="36" stroke-linecap="round"/>
      <path d="M146 332 C260 146, 410 126, 536 224 S690 360, 750 248" fill="none" stroke="${color}" stroke-width="4" stroke-dasharray="10 12"/>
      ${beaconMarkup}
      <rect x="${vehicleX}" y="${vehicleY}" width="58" height="34" rx="9" fill="${color}"/>
      <circle cx="${vehicleX + 16}" cy="${vehicleY + 40}" r="8" fill="#172026"/>
      <circle cx="${vehicleX + 44}" cy="${vehicleY + 40}" r="8" fill="#172026"/>
      <text x="126" y="466" class="svg-label">${escapeHtml(scenario.detail)}</text>
    </svg>
  `;
}

function renderStartaxi(scenario, progress) {
  const color = scenario.accent;
  const x = 148 + progress * 560;
  const y = 342 - progress * 156;
  const stopOpacity = scenario.label === "Handoff" ? 1 : 0.42;

  return `
    <svg class="demo-svg" viewBox="0 0 900 520" role="img" aria-label="STARTaxi dispatch flow">
      <rect x="34" y="36" width="832" height="448" rx="18" fill="#fbfcfa" stroke="#d9ded5"/>
      <path d="M128 384 C230 326, 318 356, 416 286 S584 170, 752 190" fill="none" stroke="#ccd4ca" stroke-width="30" stroke-linecap="round"/>
      <path d="M128 384 C230 326, 318 356, 416 286 S584 170, 752 190" fill="none" stroke="#ffffff" stroke-width="3" stroke-dasharray="16 15"/>
      <circle cx="128" cy="384" r="22" fill="#276c8f"/>
      <text x="94" y="432" class="svg-label">pickup</text>
      <circle cx="752" cy="190" r="24" fill="#2f7d5b" opacity="${stopOpacity}"/>
      <text x="720" y="238" class="svg-label">dropoff</text>
      <rect x="${x}" y="${y}" width="82" height="42" rx="12" fill="${color}"/>
      <circle cx="${x + 20}" cy="${y + 50}" r="9" fill="#172026"/>
      <circle cx="${x + 62}" cy="${y + 50}" r="9" fill="#172026"/>
      <rect x="112" y="92" width="244" height="104" rx="12" fill="#ffffff" stroke="#d9ded5"/>
      <text x="136" y="128" class="svg-title">${escapeHtml(scenario.label)}</text>
      <text x="136" y="154" class="svg-small">${escapeHtml(scenario.detail)}</text>
      <text x="136" y="178" class="svg-small">route progress ${(progress * 100).toFixed(0)}%</text>
    </svg>
  `;
}

elements.nav.forEach((button) => {
  button.addEventListener("click", () => setDemo(button.dataset.demoNav));
});

elements.scenarios.addEventListener("click", (event) => {
  const button = event.target.closest("[data-scenario]");
  if (!button) return;
  setScenario(Number(button.dataset.scenario));
});

elements.run.addEventListener("click", runTrace);

elements.timeline.addEventListener("input", () => {
  tracePosition = Number(elements.timeline.value);
  render();
});

window.addEventListener("popstate", () => {
  setDemo(new URLSearchParams(location.search).get("demo") || "davos", false);
});

setDemo(activeDemoId, false);
