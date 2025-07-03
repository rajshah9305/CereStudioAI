import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    // Basic health check
    const healthData = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: process.env.NODE_ENV || 'development',
      version: process.env.npm_package_version || '1.0.0',
      checks: {
        api: 'operational',
        database: 'not_applicable',
        external_services: await checkExternalServices()
      }
    };

    return NextResponse.json(healthData, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        status: 'unhealthy',
        timestamp: new Date().toISOString(),
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 503 }
    );
  }
}

async function checkExternalServices() {
  try {
    // Check if Cerebras API is reachable (without making actual API call)
    const cerebrasApiKey = process.env.CEREBRAS_API_KEY;
    
    return {
      cerebras_api: cerebrasApiKey ? 'configured' : 'not_configured'
    };
  } catch (error) {
    return {
      cerebras_api: 'error'
    };
  }
}
