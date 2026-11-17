const normalizeFilename = (filename: string): string => {
  const MAX_LENGTH = 50;

  const ext = (filename.match(/\.[^.]+$/)?.[0] || '').toLowerCase();
  const base = filename.slice(0, filename.length - ext.length);

  const normalized = base
    .normalize('NFD')
    .replace(/[\u0300-\u036f]|[\\/:*?"<>|]/g, '')
    .replace(/\s+/g, '_')
    .replace(/^[._]+|[._]+$/g, '')
    .replace(/_{2,}/g, '_')
    .toLowerCase()
    .slice(0, MAX_LENGTH - ext.length);

  return normalized + ext;
};

export default normalizeFilename;
