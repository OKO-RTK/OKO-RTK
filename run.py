from app import create_app

app = create_app()
app.logger.info('INFO')

if __name__ == '__main__':
    app.run(host='0.0.0.0',debug = True)