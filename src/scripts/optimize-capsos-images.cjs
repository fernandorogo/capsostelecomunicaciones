const fs = require('node:fs/promises');
const path = require('node:path');
const sharp = require('sharp');

const INPUT_DIRECTORY = path.resolve(
  __dirname,
  '../assets/capsos-gallery-original'
);

const OUTPUT_DIRECTORY = path.resolve(
  __dirname,
  '../assets/capsos-gallery-optimized'
);

const SUPPORTED_EXTENSIONS = new Set([
  '.jpg',
  '.jpeg',
  '.png',
  '.webp',
  '.avif',
]);

const getFilesRecursively = async (directory) => {
  const entries = await fs.readdir(directory, {
    withFileTypes: true,
  });

  const files = [];

  for (const entry of entries) {
    const completePath = path.join(
      directory,
      entry.name
    );

    if (entry.isDirectory()) {
      const nestedFiles =
        await getFilesRecursively(completePath);

      files.push(...nestedFiles);
      continue;
    }

    const extension = path
      .extname(entry.name)
      .toLowerCase();

    if (SUPPORTED_EXTENSIONS.has(extension)) {
      files.push(completePath);
    }
  }

  return files;
};

const formatBytes = (bytes) => {
  return `${(bytes / 1024).toFixed(1)} KB`;
};

const optimizeImage = async (inputPath) => {
  const relativePath = path.relative(
    INPUT_DIRECTORY,
    inputPath
  );

  const pathInformation = path.parse(relativePath);

  const isLogo = /logo|capsos/i.test(
    pathInformation.name
  );

  const maximumWidth = isLogo ? 1000 : 640;
  const quality = isLogo ? 88 : 76;

  const outputPath = path.join(
    OUTPUT_DIRECTORY,
    pathInformation.dir,
    `${pathInformation.name}.webp`
  );

  await fs.mkdir(path.dirname(outputPath), {
    recursive: true,
  });

  const originalInformation =
    await fs.stat(inputPath);

  await sharp(inputPath)
    .rotate()
    .resize({
      width: maximumWidth,
      fit: 'inside',
      withoutEnlargement: true,
    })
    .webp({
      quality,
      effort: 5,
      smartSubsample: true,
    })
    .toFile(outputPath);

  const optimizedInformation =
    await fs.stat(outputPath);

  const reduction =
    originalInformation.size > 0
      ? (
          100 -
          (optimizedInformation.size /
            originalInformation.size) *
            100
        ).toFixed(1)
      : 0;

  console.log(
    [
      `✓ ${relativePath}`,
      `${formatBytes(originalInformation.size)}`,
      `→ ${formatBytes(optimizedInformation.size)}`,
      `reducción: ${reduction}%`,
    ].join(' | ')
  );
};

const main = async () => {
  try {
    await fs.access(INPUT_DIRECTORY);
  } catch {
    console.error(
      '\nNo existe la carpeta de imágenes originales:'
    );

    console.error(INPUT_DIRECTORY);

    console.error(
      '\nCrea la carpeta y coloca allí las imágenes.'
    );

    process.exitCode = 1;
    return;
  }

  await fs.rm(OUTPUT_DIRECTORY, {
    recursive: true,
    force: true,
  });

  await fs.mkdir(OUTPUT_DIRECTORY, {
    recursive: true,
  });

  const images =
    await getFilesRecursively(INPUT_DIRECTORY);

  if (images.length === 0) {
    console.warn(
      '\nNo se encontraron imágenes compatibles.'
    );

    return;
  }

  console.log(
    `\nOptimizando ${images.length} imágenes...\n`
  );

  for (const imagePath of images) {
    try {
      await optimizeImage(imagePath);
    } catch (error) {
      console.error(
        `✗ Error procesando: ${imagePath}`
      );

      console.error(error.message);
    }
  }

  console.log(
    '\nOptimización terminada correctamente.'
  );

  console.log(
    `\nImágenes generadas en:\n${OUTPUT_DIRECTORY}`
  );
};

main();