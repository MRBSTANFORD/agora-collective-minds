
import { ReportData } from './reportGenerator';

export class FileGenerator {
  static async generatePDF(report: ReportData): Promise<Blob> {
    // For now, create a simple text-based PDF using a basic approach
    // In a real implementation, you'd use a library like jsPDF or html2pdf
    const content = `${report.title}\n\n${report.content}`;
    const blob = new Blob([content], { type: 'text/plain' });
    return blob;
  }

  static async generateHTML(report: ReportData): Promise<Blob> {
    const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${report.title}</title>
    <style>
        body { 
            font-family: system-ui, -apple-system, sans-serif; 
            max-width: 800px; 
            margin: 0 auto; 
            padding: 2rem; 
            line-height: 1.6;
        }
        h1, h2, h3 { color: #1e293b; }
        h1 { border-bottom: 2px solid #daa520; padding-bottom: 0.5rem; }
        .meta { color: #64748b; font-size: 0.9rem; margin-bottom: 2rem; }
        pre { background: #f8fafc; padding: 1rem; border-radius: 0.5rem; overflow-x: auto; }
    </style>
</head>
<body>
    <h1>${report.title}</h1>
    <div class="meta">Generated on ${report.generatedAt.toLocaleDateString()} at ${report.generatedAt.toLocaleTimeString()}</div>
    <div>${this.formatContentAsHTML(report.content)}</div>
</body>
</html>`;
    
    const blob = new Blob([htmlContent], { type: 'text/html' });
    return blob;
  }

  static downloadFile(blob: Blob, filename: string, format: string) {
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${filename}.${format}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  private static formatContentAsHTML(content: string): string {
    return content
      .replace(/^# (.*$)/gm, '<h1>$1</h1>')
      .replace(/^## (.*$)/gm, '<h2>$1</h2>')
      .replace(/^### (.*$)/gm, '<h3>$1</h3>')
      .replace(/^\- (.*$)/gm, '<li>$1</li>')
      .replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>')
      .replace(/\n\n/g, '</p><p>')
      .replace(/^(.)/gm, '<p>$1')
      .replace(/(.$)/gm, '$1</p>');
  }
}
