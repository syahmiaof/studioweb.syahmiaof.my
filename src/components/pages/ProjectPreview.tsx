"use client";

import Image from "next/image";
import { useState } from "react";
import type { Locale, ProjectItem } from "@/lib/types";
import { getLocalProjectPreviewPath } from "@/lib/project-preview";

export function ProjectPreview({ project, locale }: { project: ProjectItem; locale: Locale }) {
  const [imageUnavailable, setImageUnavailable] = useState(false);
  const imagePath = getLocalProjectPreviewPath(project.id, Boolean(project.liveUrl));
  const image = imagePath && !imageUnavailable ? imagePath : null;
  const isChinese = locale === "zh-Hans";
  const fallbackLabel = locale === "ms" ? "Pratonton belum tersedia" : isChinese ? "预览暂不可用" : "Preview unavailable";

  return (
    <div className="project-preview">
      {image ? (
        <Image
          className="project-preview-image"
          src={image}
          alt={locale === "ms" ? `Pratonton ${project.title}` : isChinese ? `${project.title} 预览` : `${project.title} preview`}
          fill
          unoptimized
          loading="lazy"
          sizes="(max-width: 620px) 92vw, (max-width: 1100px) 45vw, 30vw"
          onError={() => setImageUnavailable(true)}
        />
      ) : (
        <div className="project-preview-fallback" aria-label={fallbackLabel}>
          <span aria-hidden="true">{project.title.trim().charAt(0).toUpperCase()}</span>
          <strong>{project.title}</strong>
          <small>{fallbackLabel}</small>
        </div>
      )}
      {project.liveUrl && <span className="project-preview-open">{locale === "ms" ? "BUKA PROJEK ↗" : isChinese ? "查看项目 ↗" : "VIEW PROJECT ↗"}</span>}
    </div>
  );
}
