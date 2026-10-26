import { describe, expect, it } from "vitest";
import { PROJECTS } from "../../src/content/projects";
import { getLocalProjectPreviewPath } from "../../src/lib/project-preview";

describe("Nemo project portfolio", () => {
  it("contains every record with the source statuses and only the supplied live links", () => {
    expect(PROJECTS).toHaveLength(23);
    expect(PROJECTS.filter((project) => project.status === "completed")).toHaveLength(12);
    expect(PROJECTS.filter((project) => project.status === "on-hold")).toHaveLength(8);
    expect(PROJECTS.filter((project) => project.status === "in-progress")).toHaveLength(3);
    expect(PROJECTS.filter((project) => !project.liveUrl)).toHaveLength(3);
    expect(PROJECTS.find((project) => project.id === "sakura-store")?.liveUrl).toBe("https://sakurastore.syahmiaof.my");
  });

  it("uses local static previews without third-party screenshot services", () => {
    expect(getLocalProjectPreviewPath("sakura-store", true)).toBe("/assets/portfolio-previews/sakura-store.webp");
    expect(getLocalProjectPreviewPath("custom-new-project", true)).toBe("/assets/portfolio-previews/custom-new-project.webp");
    expect(getLocalProjectPreviewPath("not a safe/id", true)).toBeNull();
    expect(getLocalProjectPreviewPath("story-syahmiaof", false)).toBeNull();
  });
});
