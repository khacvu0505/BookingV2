import { useTranslation } from "react-i18next";
import "./Timelines.styles.scss";

interface TimelinesProps {
  steps?: any[];
  handleMoreClick: (step: any) => void;
}

const Timelines = ({ steps = [], handleMoreClick }: TimelinesProps) => {
  const { t } = useTranslation();
  const svgWidth = 1100;
  const svgHeight = 250;
  const margin = 0;
  const segmentWidth = (svgWidth - 2 * margin) / (steps.length - 1);
  const waveAmplitude = -50; // Amplitude of the sine wave
  const waveFrequency = Math.PI; // Frequency of the sine wave (one full sine wave)

  const wrapTextWithEllipsis = (text: string, maxCharsPerLine: number, maxLines: number) => {
    const words = text.split(" ");
    const lines: string[] = [];
    let currentLine = "";

    words.forEach((word: string) => {
      if ((currentLine + word).length > maxCharsPerLine) {
        lines.push(currentLine.trim());
        currentLine = word + " ";
      } else {
        currentLine += word + " ";
      }
    });

    if (currentLine.trim()) {
      lines.push(currentLine.trim());
    }

    if (lines.length > maxLines) {
      const truncatedLines = lines.slice(0, maxLines - 1);
      const lastLine = lines[maxLines - 1];
      truncatedLines.push(lastLine.slice(0, maxCharsPerLine - 3) + "...");
      return truncatedLines;
    }

    return lines;
  };

  // Generate a sine wave path with cubic Bézier curves
  const generateSineWavePath = () => {
    let path = "";
    let wavePoints: { x: number; y: number }[] = [];
    const yBase = svgHeight / 3; // Center y for the wave

    // Add the first point to the path
    const startX = margin;
    const startY = yBase + waveAmplitude * Math.sin(waveFrequency * 0);
    path += `M${startX},${startY}`;

    // Store the points for circles
    wavePoints.push({ x: startX, y: startY });

    for (let i = 1; i < steps.length; i++) {
      const x = margin + i * segmentWidth; // x coordinate for each step
      const y =
        yBase +
        waveAmplitude * Math.sin(waveFrequency * (i / (steps.length - 1))); // y = A * sin(Bx)

      // Store the points for circles
      wavePoints.push({ x, y });

      // Use cubic Bézier curve to smoothly connect the points
      const prevPoint = wavePoints[i - 1];
      const controlX = (prevPoint.x + x) / 2; // Control point for smooth curve
      const controlY = prevPoint.y + y / 2;

      // Smooth line using cubic Bézier curve
      path += ` C${controlX},${prevPoint.y} ${controlX},${y} ${x},${y}`;
    }

    return { path, wavePoints };
  };

  const { path, wavePoints } = generateSineWavePath();

  return (
    <div className="journey-path">
      <svg className="path-svg" viewBox={`0 0 ${svgWidth} ${svgHeight}`}>
        {/* Sine Wave Path with Bézier curve */}
        <path
          d={path}
          stroke="var(--color-primary-500)"
          strokeWidth="2"
          strokeDasharray="5,5"
          fill="none"
        />
        {/* Steps */}
        {steps?.map((step: any, index: number) => {
          const { x, y } = wavePoints[index]; // Get x, y position from sine wave
          const wrappedTitle = wrapTextWithEllipsis(`${step.value1} `, 20, 4); // Max 20 characters per line, 4 lines max

          return (
            <g key={index} className="step">
              {/* Circle */}
              <circle cx={x} cy={y} r="20" fill="var(--color-primary-500)" />
              {/* Step Number */}
              <text
                x={x}
                y={y}
                textAnchor="middle"
                dominantBaseline="central"
                fill="white"
                fontSize="14"
                fontWeight="bold"
              >
                {index + 1}
              </text>
              {/* Info Text */}
              <text
                x={x}
                y={y + 50}
                textAnchor="middle"
                fill="var(--color-primary-500)"
                fontSize="16"
                fontWeight="bold"
                style={{
                  textWrap: "wrap",
                  width: "20px",
                }}
              >
                {wrappedTitle.map((line: string, i: number) => (
                  <tspan key={i} x={x} dy={i === 0 ? 0 : 14}>
                    {line}
                  </tspan>
                ))}
              </text>
              <text
                x={x}
                y={y + 80 + (wrappedTitle.length - 1) * 14}
                textAnchor="middle"
                fill="var(--color-neutral-800)"
                fontSize="14"
              >
                {t("COMMON.STOP_OVER")} : {step.value} {t("COMMON.MINUTES")}
              </text>
              <text
                x={x}
                y={y + 105 + (wrappedTitle.length - 1) * 14}
                textAnchor="middle"
                fill="var(--color-primary-500)"
                fontSize="14"
                style={{
                  cursor: "pointer",
                  fontStyle: "italic",
                }}
                onClick={() => handleMoreClick(step)}
              >
                {t("COMMON.VIEW_MORE")}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

export default Timelines;
